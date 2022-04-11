FROM node:16
LABEL maintainer="CIT Computing"

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD ["node", "server.js"]

