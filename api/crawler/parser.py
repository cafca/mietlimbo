#!/usr/bin/env python3

import re
import requests
import pickle
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from pprint import pformat

from logger import setup_logger

logger = setup_logger()

url_search = "http://www.stadtentwicklung.berlin.de/wohnen/mietspiegel/de/strassensuche.shtml?sid=12"
url_save = "http://www.stadtentwicklung.berlin.de/wohnen/mietspiegel/skript/save.php?sid=12"

class MietspiegelParser(object):
    def get_cookies(self):
        """Return a fresh cookie jar."""
        req = requests.head(url_search)

        cookies = req.cookies
        logger.debug("Cookie get {}".format(req.status_code))
        return cookies

    def save_streets(self, data):
        """Save each street name from a dataset to the db.

        Args:
            data (list): A list of dicts, each describing a street range
        """
        from main import db
        from model import Street

        i = 0
        for street in data:
            for street_range in street["ranges"]:
                s = Street.query.get(street_range["id"])
                if s is None:
                    # This is a new street entry
                    i += 1
                    s = Street(
                        id=street_range["id"],
                        name=street["name"],
                        number_range=street_range["name"]
                    )
                    db.session.add(s)
        logger.info("Saving {} new streets".format(i))
        db.session.commit()


    def find_street(self, query, cookies=None):
        """Given a 4-char query, crawl Mietspiegel site for street range entries.

        Args:
            query (string): Leading four characters of a street name.
            cookies (CookieJar): Optional cookie jar to use for the req.
        """
        if len(query) < 4:
            logger.warning("Less than four chars: {}".format(query))

        if cookies is None:
            cookies = self.get_cookies()

        logger.info("Searching street directory for '{}'".format(query))

        payload = {'qstrasse': query, 'qact': 'svstr', 'suche_button': 'Suchen'}
        req = requests.post(url_save, data=payload, cookies=cookies)
        logger.debug("Search {}".format(req.status_code))

        soup = BeautifulSoup(req.text, 'html.parser')
        res_list = soup.find_all('div', class_='spalte_470')
        logger.debug("Result lists: {}".format(len(res_list)))

        results = res_list[0].find_all('div', class_='strblock')
        logger.debug("Found {} results\n".format(len(results)))

        streets = list()
        for res in results:
            ranges = list()
            for entry in res.find_all('div', class_='linkliste'):
                href = entry.a.get('href')
                spos = href.find("strt=") + len("strt=")
                epos = href.find("&", spos) if href.find("&", spos) > 0 else len(href)
                ranges.append({
                    "name": entry.a.text.strip(),
                    "id": int(href[spos:epos])
                })
            streets.append({
                "name": res.h3.text,
                "ranges": ranges
            })
        # logger.debug("Street search result:\n{}".format(pformat(streets, indent=2)))

        # self.save_streets(streets)
        return streets


    def get_range(self, street_id, year_range_name, real_size=None, 
            guessed_size_name=None, cookies=None):
        """Query Mietspiegel site for detailed data about a given street entry.

        Args:
            street_id (int): Street id obtained through self.find_street
            year_range_name (string): Building construction date range
            real_size (float): Size of the flat
            guessed_size_name (string): Size range of the flat
            cookies (CookieJar): Optional cookie jar to use for the req
        """
        year_ranges = {    
            "Pre1918": 1,
            "Pre1949": 2, 
            "Pre1964": 3,
            "Pre1972": 4,
            "Pre1990": 5,
            "Pre2002": 6,
            "Pre2013": 7
        }

        size_ranges = {
            "lt40": 1,
            "lt60": 2, 
            "lt90": 3, 
            "gt90": 4,
        }

        assert type(street_id) == int

        if year_range_name not in year_ranges.keys():
            logger.debug("Default year range selected")
        year_range = year_ranges.get(year_range_name, year_ranges["Pre1918"])

        if real_size is  None and guessed_size_name not in size_ranges.keys():
            logger.debug("No size range given")
        guessed_size = size_ranges.get(guessed_size_name, None)

        if cookies is None:
            cookies = self.get_cookies()

        payload = {'qact': 'svstraw', 'strt': street_id, 'sid': 12}
        req = requests.get(url_save, params=payload, cookies=cookies)
        logger.debug("Search {}".format(req.status_code))

        payload = {
            'qyear': year_range, 
            'realsize': real_size,
            'qsize': guessed_size,
            'qact': 'svyas',
            'weiter': 'Weiter zum Zwischenergebnis »'
        }
        req = requests.post(url_save, data=payload, cookies=cookies)
        soup = BeautifulSoup(req.text, 'html.parser')
        
        results = soup.find_all('div', class_='zf')

        def extract_values(result):
            """Extract rent values from result object."""
            rv = {
                'min': result.find_all('span', class_='min')[0].text[:-2].replace(',', '.'),
                'mid': result.strong.text.strip().replace(',', '.'),
                'max': result.find_all('span', class_='max')[0].text[2:].replace(',', '.')
            }

            warning = re.search("(\*){1,3}", rv['mid'])
            if warning:
                rv['warnings'] = warning.group()
                rv['mid'] = rv['mid'][:warning.start()]

            try:
                for k in ['min', 'mid', 'max']:
                    rv[k] = float(rv[k])
            except ValueError:
                logger.error("Float conversion failed for: {}\n\n{}".format(rv[k], result))
                return None
            else:
                return rv

        def extract_category(result):
            """Extract available categories from result object."""
            names = {
                "ohne SH,  ohne Bad,  mit IWC":     "both",
                "mit SH  oder Bad,  mit IWC":       "either",
                "mit SH,  Bad  und IWC":            "default",
                "t SH,  Bad  und IWC":              "default"
            }
            elem = result.findPrevious("h4", class_="mm_rot")
            desc = elem.text[15:]
            try:
                rv = names[desc]
            except KeyError:
                logger.error("Category '{}' not known\nSource: {}".format(desc, elem.text))
                rv = "unknown-{}".format(elem.text[:8])
            return rv

        def extract_metadata(result):
            """Extract additional metadata (noise level, etc)."""
            rv = {}
            for feature in result.find_all('strong'):
                fname = feature.text[:-1]
                fvalue = feature.nextSibling.strip()
                rv[fname] = fvalue
            return rv

        rv = {}
        for dataset in results:
            category = extract_category(dataset)
            # Remove following line to extract non-default variations as well
            # (they are calculated in Street.get_rent)
            if category == "default":
                rv[category] = extract_values(dataset)
        
        metadata = soup.find_all("div", class_="msadresse")
        if len(metadata) == 1:
            rv["metadata"] = extract_metadata(metadata[0])
        else:
            logger.warning("Metadata not found for {}\n{}".format(street_id, metadata))
            rv["metadata"] = None

        # self.save_range(street_id, rv, req)
        logger.debug("=> {}".format(pformat(rv["metadata"], indent=2)))
        return rv

    def save_range(self, street_id, rv, request):
        """Save each ranged street entry from a dataset to the db.

        Args:
            street_id (int): Identifier for the street
            rv (dict): Return value of self.get_range function
            request (Request): Full request object to be stored on disk for
                future further processing / error correction
        """
        from main import db
        from model import Street

        metadata = rv.get("metadata", {})

        s = Street.query.get(street_id)
        if s is None:
            logger.error("Street not found {}".format(street_id))
        elif metadata is not None:
            s.area_rating = metadata.get("Wohnlage", None)
            s.noise_impact = metadata.get("Lärmbelastung", None)
            s.bezirk = metadata.get("Bezirk", None)
            s.stadtgebiet = metadata.get("Stadtgebiet", None)

            s.rent = pickle.dumps({
                "default": rv.get("default", None),
                "either": rv.get("either", None),
                "both": rv.get("both", None)
            })

            if request is not None:
                with open("../data/{}.html".format(street_id), "wb") as f:
                    f.write(request.content)

            logger.debug("Storing updated street {}".format(s))
            db.session.add(s)
            db.session.commit()
        else:
            logger.warning("No data for {}".format(street_id))



