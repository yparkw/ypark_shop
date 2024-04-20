# 가져올 이미지를 정의
FROM node:14 AS build-stage

# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json ./
# 명령어 실행 (의존성 설치)
RUN npm install --legacy-peer-deps

COPY . ./

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/letsencrypt

RUN echo -e "ssl_session_cache shared:le_nginx_SSL:1m;\nssl_session_timeout 1440m;\nssl_protocols TLSv1.2 TLSv1.3;\nssl_prefer_server_ciphers on;\nssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';" > /etc/letsencrypt/options-ssl-nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
