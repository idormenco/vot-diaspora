FROM code4romania/base-alpine-nginx-node

RUN npm install -g yarn gulp

ADD . /www

RUN cd /www && yarn install && gulp build

RUN cp /www/setup/vhost.conf /etc/nginx/conf.d/default.conf
