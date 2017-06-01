#!/usr/bin/env python3
"""
Documentation

See also https://www.python-boilerplate.com/flask
"""
import os

from flask import Flask, jsonify, send_file
from flask_cors import CORS
from logger import setup_logger

logger = setup_logger(logfile=None)


def create_app(config=None):
    app = Flask(__name__)

    # See http://flask.pocoo.org/docs/0.12/config/
    app.config.update(dict(DEBUG=True, SECRET_KEY="development key"))
    app.config.update(config or {})

    # Setup cors headers to allow all domains
    # https://flask-cors.readthedocs.io/en/latest/
    CORS(app)

    # Definition of the routes. It's probably a good idea to break them out
    # into their own file soon. See also Flask Blueprints:
    # http://flask.pocoo.org/docs/0.12/blueprints
    @app.route("/")
    def hello_world():
        logger.info("/")
        return "Hello World"

    @app.route("/foo/<someId>")
    def foo_url_arg(someId):
        logger.info("/foo/%s", someId)
        return "Test: " + someId

    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
