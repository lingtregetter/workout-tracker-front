FROM nginx:latest
FROM amd64/nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./www/build /usr/share/nginx/html
