FROM nginx:1.18.0 AS production-stage

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]