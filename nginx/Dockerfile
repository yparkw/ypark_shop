FROM nginx:1.18.0
COPY nginx.conf /etc/nginx/nginx.conf

COPY /client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]