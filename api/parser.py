#!/usr/bin/env python3

import re
import requests
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

    def find_street(self, query, cookies=None):
        assert len(query) >= 4

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
        logger.info("Found {} results\n".format(len(results)))

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

        logger.debug("Street search result:\n{}".format(pformat(streets, indent=2)))
        return streets


    def get_range(self, street_id, year_range_name, real_size=None, guessed_size_name=None, cookies=None):
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

        assert year_range_name in year_ranges.keys()
        year_range = year_ranges.get(year_range_name)

        assert real_size is not None or guessed_size_name in size_ranges.keys()
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
        assert len(results) == 3

        def extract_values(result):
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
            finally:
                return rv

        rv = {
            "both": extract_values(results[0]),
            "either": extract_values(results[1]),
            "default": extract_values(results[2])
        }
        logger.debug("Result set:\n{}".format(pformat(rv, indent=2)))
        return rv
