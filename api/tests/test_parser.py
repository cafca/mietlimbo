"""
Test parser functions
"""

import pytest
from parser import MietspiegelParser

@pytest.fixture
def parser():
    """Constructr a parser to use in all tests."""
    return MietspiegelParser()

def test_find_street(parser):
    """Test that street search results are parsed correctly."""
    res = parser.find_street("Babel")
    assert len(res) == 1
    assert len(res[0]['ranges']) == 4
    assert res[0]['ranges'][0]['name'].find("Hausnummern") > 0

def test_get_range(parser):
    """Test that range lookups are parsed correctly."""
    res = parser.get_range(2940, 1, real_size=60)
    for result_set in res.values():
        for bracket in ['max', 'mid', 'min']:
            assert isinstance(result_set[bracket], float)
            assert result_set[bracket] > 0

    assert res['both']['warnings'] == "***"
