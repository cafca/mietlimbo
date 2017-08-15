#!/bin/bash

git pull
git checkout master

cd client
npm run build

rm -rf /var/www/mietlimbo/* &&
mv build/* /var/www/mietlimbo/ &&
rm build/* &&

cd -s