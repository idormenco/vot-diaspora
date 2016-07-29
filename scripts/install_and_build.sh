#!/bin/bash
cd /www/votdiaspora.ro
[ -d /www/votdiaspora.ro/bower_components ] || mkdir -p /www/votdiaspora.ro/bower_components
npm install && bower install
gulp build
