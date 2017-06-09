#!/usr/bin/env python3

from distutils.core import setup

setup(name='Mietlimbo API',
    version='1.0',
    description='Mietlimbo backend',
    author='Vincent Ahrend',
    author_email='hallo@mietlimbo.de',
    url='https://www.python.org/',
    packages=['api'],
    install_requires=[
		"flask",
		"requests",
		"beautifulsoup4"
	]
)