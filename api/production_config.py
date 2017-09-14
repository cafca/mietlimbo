import os

DEBUG = False
SECRET_KEY=os.environ.get("MIETLIMBO_SECRET", "server secret")
SQLALCHEMY_DATABASE_URI = 'sqlite:///data/strassenverzeichnis.sqlite'

SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_ECHO = False
SQLALCHEMY_RECORD_QUERIES = False

if SECRET_KEY == "server secret":
	print('Set server secret key environment variable MIETLIMBO_SECRET!')