#!/bin/bash

git pull &&
git checkout master &&

cd client &&
npm install &&
npm run build &&

mv build/* /var/www/mietlimbo/ &&
rm build &&
cd -s &&