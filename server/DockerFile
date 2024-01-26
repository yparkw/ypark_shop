FROM python:3.12.1

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFRED 1

RUN apt-get update

# 작업 디렉토리 설정
WORKDIR /server

RUN pip install --upgrade pip
COPY ./requirements.txt  /server/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /server/
RUN mkdir -p /server/logs


EXPOSE 8000

# Gunicorn으로 실행
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]