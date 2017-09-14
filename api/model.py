#!/usr/bin/env python3
"""
Mietspiegel Persistence Model

"""
import json

from main import db, create_app, logger
from flask_sqlalchemy import SQLAlchemy
import pickle

MIETSPIEGEL = "data/mietspiegel.json"


class Street(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    number_range = db.Column(db.Text)
    area_rating = db.Column(db.String(16))
    noise_impact = db.Column(db.String(16))
    bezirk = db.Column(db.String(32))
    stadtgebiet = db.Column(db.String(32))

    def __init__(self, id, name, number_range):
        self.id = id
        self.name = name
        self.number_range = number_range

    def __repr__(self):
        return "<{}: {} ({})>".format(self.id, self.name, self.number_range)

    @classmethod
    def find(cls, query):
        """Return all streets starting with query from database."""
        errors = []
        streets = cls.query.filter(cls.name.startswith(query)).all()

        rv = {}
        for street in streets:
            logger.debug(street)
            range_data = {
                "id": street.id,
                "name": street.number_range
            }
            if street.name not in rv:
                rv[street.name] = {
                    "name": street.name,
                    "ranges": [range_data]
                }
            else:
                rv[street.name]["ranges"].append(range_data)
        return [s for s in rv.values()]

    def get_rent(self, year_range, real_size, guessed_size):
        """Return rent data for a given street/range."""

        with open(MIETSPIEGEL, "r") as f:
            data = json.load(f)

        if guessed_size is None:
            if real_size < 40:
                guessed_size = "Sub40"
            elif real_size < 60:
                guessed_size = "Sub60"
            elif real_size < 90:
                guessed_size = "Sub90"
            else:
                guessed_size = "Sup90"

        if year_range == "Pre1990":
            year_range = "Pre1990W" if self.stadtgebiet == "Berlin West" else "Pre1990E"

        rent_range = data[year_range][guessed_size][self.area_rating]

        labels = ["min", "mid", "max", "warnings"]
        rv = {"default": {}}
        for i in range(len(rent_range)):
            rv["default"][labels[i]] = rent_range[i]

        # See annotation of the Mietspiegeltabelle
        if year_range == "Pre1918":
            rv["either"] = dict([(k, v - 1.34) for k, v 
                in rv["default"].items() if type(v) == float])
            rv["both"] = dict([(k, v - 0.87) for k, v 
                in rv["default"].items() if type(v) == float])

        if year_range == "Pre1949":
            rv["either"] = dict([(k, v - 0.35) for k, v 
                in rv["default"].items() if type(v) == float])
            rv["both"] = dict([(k, v - 0.87) for k, v 
                in rv["default"].items() if type(v) == float])

        if year_range == "Pre1964":
            rv["either"] = dict([(k, v - 0.81) for k, v 
                in rv["default"].items() if type(v) == float])

        rv["metadata"] = {
            "Wohnlage": self.area_rating,
            "Lärmbelastung": self.noise_impact,
            "Stadtgebiet": self.stadtgebiet
        }

        logger.info("RV: {}".format(rv))

        return rv

if __name__ == "__main__":
    logger.warning("Resetting database...")
    from main import create_app
    # db.create_all(app=create_app())
