FROM node:8.4
MAINTAINER Lunedis

EXPOSE 7000

WORKDIR /opt/intel-server

COPY package.json .
COPY package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "start"]