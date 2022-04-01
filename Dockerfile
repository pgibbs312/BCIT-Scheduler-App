FROM ubuntu:18.04

LABEL maintainer="CIT Computing"

RUN apt-get update -y 
RUN apt-get upgrade -y

WORKDIR /BCIT-Scheduler-App

RUN npm install -y

CMD ["npm", "start"]

EXPOSE 80 443