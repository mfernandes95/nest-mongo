FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm i -g @nestjs/cli

COPY . .
