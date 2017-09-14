"""
You can auto-discover and run all tests with this command:

    $ pytest

Documentation:

* https://docs.pytest.org/en/latest/
* https://docs.pytest.org/en/latest/fixture.html
* http://flask.pocoo.org/docs/latest/testing/
"""

import pytest
import json

import main


@pytest.fixture
def app():
    """Create Flask app test client."""
    app = main.create_app()
    app.debug = True
    return app.test_client()


def test_find_street(app):
    """Test street finding API."""
    resp = app.get("/api/v1/street?name=Babel")
    assert resp.status_code == 200
    res = json.loads(resp.data)
    assert isinstance(res["data"], list)
    assert "errors" not in res.keys()

    resp = app.get("/api/v1/street?name=Ba")
    assert resp.status_code == 200
    res = json.loads(resp.data)
    assert len(res["errors"]) > 0


def test_get_range(app):
    """Test range calculating API."""
    resp = app.get("/api/v1/range?street_id=38536&year_range=1&real_size=60")
    assert resp.status_code == 200
    res = json.loads(resp.data)
    assert isinstance(res["data"], dict)
    assert "errors" not in res.keys()

    resp = app.get("/api/v1/range?street_id=38536&year_range=1&guessed_size=2")
    assert resp.status_code == 200
    res = json.loads(resp.data)
    assert isinstance(res["data"], dict)
    assert "errors" not in res.keys()
