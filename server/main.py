#!/usr/bin/env python3
"""
Mietspiegel API

"""
import os

from flask import Flask, jsonify, request
from logger import setup_logger
from parser import MietspiegelParser

logger = setup_logger(logfile=None)

def create_app(config=None):
    app = Flask(__name__)

    # See http://flask.pocoo.org/docs/0.12/config/
    app.config.update(dict(DEBUG=True, SECRET_KEY="development key"))
    app.config.update(config or {})

    @app.route("/api/v1/street", methods=["GET"])
    def find_street():
        logger.info("street api")
        rv = {}

        street_name = request.args.get("name")
        if len(street_name) < 4:
            rv["errors"] = ["Street query too short"]
        else:
            ps = MietspiegelParser()
            rv["data"] = ps.find_street(street_name)

        return jsonify(rv)

    @app.route("/api/v1/range", methods=["GET"])
    def get_range():
        logger.info("range api")
        rv = {}

        street_id = int(request.args.get("street_id"))
        year_range = int(request.args.get("year_range"))
        real_size = request.args.get("real_size")

        if real_size is None:
            guessed_size = int(request.args.get("guessed_size"))
        else:
            guessed_size = None

        ps = MietspiegelParser()
        rv["data"] = ps.get_range(street_id, year_range, real_size, guessed_size)
        return jsonify(rv)

    return app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
