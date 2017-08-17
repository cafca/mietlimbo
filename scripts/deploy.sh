#!/bin/bash

git pull &&
git checkout master &&

cd client &&
npm install &&
npm run build &&

rm -rf /var/www/mietlimbo/* &&
mv build/* /var/www/mietlimbo/ &&

cd -