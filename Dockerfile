FROM node:8.4
MAINTAINER Lunedis

EXPOSE 7000

WORKDIR /opt/intel-server

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start"]
