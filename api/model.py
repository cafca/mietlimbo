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

    def __init__(self, id, name, number_range):
        self.id = id
        self.name = name
        self.number_range = number_range

    def __repr__(self):
        return "<{}: {} ({})>".format(self.id, self.name, self.number_range)

    @classmethod
    def find(cls, query):
    	errors = []
    	rv = cls.query.filter(cls.name.startswith(query)).group_by(cls.name).all()
    	logger.warning("Find result\n", rv)
    	if len(rv) == 0:
    		errors.append("No streets found")
    	return rv, errors

if __name__ == "__main__":
    logger.warning("Resetting database...")
    db.create_all(app=create_app())