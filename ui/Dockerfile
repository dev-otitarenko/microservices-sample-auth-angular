FROM nginx:alpine

RUN apk update && \
    apk upgrade
COPY ./default.nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir /www
COPY /dist /www

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

