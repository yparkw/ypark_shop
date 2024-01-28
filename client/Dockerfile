# 가져올 이미지를 정의
FROM node:14 AS build-stage
# 경로 설정하기
WORKDIR /client
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json ./
# 명령어 실행 (의존성 설치)
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build
