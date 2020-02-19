
# Base image
FROM nginx:1.15.9-alpine

# Overwrite the default nginx.conf file
COPY ./default.conf /etc/nginx/nginx.conf