#!/usr/bin/env python3

import csv
import json
import logging
from logger import setup_logger
from parser import MietspiegelParser
from datetime import datetime, timedelta
from time import sleep

logger = setup_logger(logfile="./crawler.log", level=logging.DEBUG)

LETTERS = "abcdefghiklmnopqrstuvwxyzäöüß-"
STARTING_QUERY = "aaaa"
QLEN = 4
STREET_NAMES = "../streetnames.csv"
JSON_STREETS = "../streets.json"

class Limiter(object):
	# limit in calls per second
	limit = timedelta(seconds=1)
	last = datetime.now()

	def wait(self):
		now = datetime.now()
		dt = now - self.last
		if dt < self.limit:
			sleep_time = (self.limit - dt).seconds + float(0.000001) * (self.limit - dt).microseconds
			sleep(sleep_time)
		self.last = datetime.now()
		return dt


def next_query(q):
	# Produces next permutation of q
	for pos in range(QLEN):
		nxt = (LETTERS.find(q[pos]) + 1) % len(LETTERS)
		q = q[:pos] + LETTERS[nxt] + q[pos + 1:]
		if nxt != LETTERS[0]:
			break
	return q

def load_street_names():
	# Convert csv street names into json
	streets = []
	i = 0
	with open(STREET_NAMES) as f:
		with open("../streets.json", "w") as f1:
			reader = csv.reader(f, delimiter=";")
			for row in reader:
				streets.append(row[1])
				i += 1
				if i % 100 == 0:
					logger.info("{}: {}".format(i, row[1]))
			logger.info("{}: {}".format(i, row[1]))
			json.dump(streets, f1)

def crawl_street_names():
	STARTAT = 8985

	logger.info("Starting crawling")
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
			logger.info("Finished {}/{} ({} %)".format(i, numstreets, round((100.0 * i) / numstreets, 2)))


def crawl_street_data():
	from model import Street
	ps = MietspiegelParser()
	cookies = ps.get_cookies()

	logger.info("Starting crawling")

	limiter = Limiter()
	streets = Street.query.all()
	i = 0

	numstreets = len(streets)
	for street in streets[i:]:
		if i%25 == 0: cookies = ps.get_cookies()
		i += 1
		try:
			ps.get_range(street.id, None, cookies=cookies)
		except Exception as e:
			import pdb
			pdb.set_trace()
		dt = limiter.wait()
		logger.info("Loaded {} % - {} left - {}".format(round((100.0 * i) / numstreets, 2), numstreets - i, street))



if __name__ == "__main__":
	from main import create_app
	app = create_app()
	app.app_context().push()
	with app.app_context():
		crawl_street_data()
