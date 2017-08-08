#!/usr/bin/env python3
"""
Mietspiegel Persistence Model

"""
from main import db, create_app, logger
from flask_sqlalchemy import SQLAlchemy

class Street(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    number_range = db.Column(db.Text)
    area_rating = db.Column(db.String(16))
    noise_impact = db.Column(db.String(16))
    bezirk = db.Column(db.String(32))
    stadtgebiet = db.Column(db.String(32))
    rent = db.Column(db.PickleType())

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

if __name__ == "__main__":
    logger.warning("Resetting database...")
    from main import create_app
    # db.create_all(app=create_app())
