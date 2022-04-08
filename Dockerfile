FROM ubuntu:18.04
LABEL maintainer="CIT Computing"

WORKDIR /app
COPY ./* /app

RUN apt update
RUN apt install nodejs -y
RUN apt install npm -y



CMD ["node", "server.js"]

