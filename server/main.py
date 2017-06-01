#!/usr/bin/env python3
"""
Module Docstring
"""

__author__ = "Your Name"
__version__ = "0.1.0"
__license__ = "MIT"

from logger import setup_logger

logger = setup_logger(logfile=None)


def main():
    """ Main entry point of the app """
    logger.info("hello world")


if __name__ == "__main__":
    """ This is executed when run from the command line """
    main()
