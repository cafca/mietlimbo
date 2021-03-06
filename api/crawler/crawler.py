#!/usr/bin/env python3

import csv
import json
import logging
from datetime import datetime, timedelta
from time import sleep

from parser import MietspiegelParser
from logger import setup_logger

logger = setup_logger(level=logging.DEBUG)

STREET_NAMES = "../data/streetnames.csv"
JSON_STREETS = "../data/streets.json"

class Limiter(object):
	# Minimum time that should have passed between calls to self.wait
	limit = timedelta(seconds=1)

	# Time of last call
	last = datetime.now()

	def wait(self):
		"""Blocks until self.limit has passed since last call."""
		now = datetime.now()
		dt = now - self.last
		if dt < self.limit:
			sleep_time = (self.limit - dt).seconds 
				+ float(0.000001) * (self.limit - dt).microseconds
			sleep(sleep_time)
		self.last = datetime.now()
		return dt

def load_street_names():
	"""Convert CSV street names to JSON encoded list.

	CSV is loaded from STREET_NAMES and JSON is written
	to JSON_STREETS.
	"""
	streets = []
	i = 0
	with open(STREET_NAMES) as f:
		with open(JSON_STREETS, "w") as f1:
			reader = csv.reader(f, delimiter=";")
			for row in reader:
				# Only append street name, discarding geo pos
				streets.append(row[1])
				i += 1
				if i % 100 == 0:
					logger.info("{}: {}".format(i, row[1]))
			logger.info("{}: {}".format(i, row[1]))
			json.dump(streets, f1)

def crawl_street_names():
	"""Crawl address names and IDs from Mietspiegel website.

	A list of candidate names is read from JSON_STREETS and
	queries are sent to the address database, embedded in the
	Mietspiegel website. Queries consist of the leading four
	characters of each candidate, with duplicate 4-character
	queries avoided. A limiter is used to restrict call volume.

	"""
	STARTAT = 8985

	logger.info("Starting crawling")
	# 'STRNAME' is the CSV file's header for the street col
	QUERIES = set(["STRNAME"])
	ps = MietspiegelParser()
	limiter = Limiter()
	with open(JSON_STREETS) as f:
		streets = json.load(f)

	last = ""
	i = 0
	numstreets = len(streets)
	for cur in streets:
		if i%1000 == 0: logger.info("{} done".format(i))
		q = cur[:4]
		i += 1
		QUERIES.add(q)
		if i < STARTAT:
			continue
		elif q != last and q not in QUERIES:
			ps.find_street(q)

			last = q
			dt = limiter.wait()
			logger.info("Finished {}/{} ({} %)".format(
				i, numstreets, round((100.0 * i) / numstreets, 2)))


def crawl_street_data():
	"""Crawl Mietspiegel data for a list of street IDs

	
	
	"""
	from model import Street
	ps = MietspiegelParser()
	cookies = ps.get_cookies()

	logger.info("Starting crawling")

	limiter = Limiter()
	streets = Street.query.all()
	i = 0

	numstreets = len(streets)
	for street in streets[i:]:
		# From time to time, get new cookies
		if i%25 == 0: cookies = ps.get_cookies()
		i += 1
		try:
			ps.get_range(street.id, None, cookies=cookies)
		except Exception as e:
			# Live debugging :o
			import pdb
			pdb.set_trace()
		dt = limiter.wait()
		logger.info("Loaded {} % - {} left - {}".format(
			round((100.0 * i) / numstreets, 2), numstreets - i, street))



if __name__ == "__main__":
	from main import create_app
	app = create_app()
	app.app_context().push()
	with app.app_context():
		# First step
		crawl_street_names()

		# Second step
		crawl_street_data()
