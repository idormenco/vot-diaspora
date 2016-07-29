#!/bin/bash
cd /www/votdiaspora.ro
npm install bower
npm install && bower install
gulp build
