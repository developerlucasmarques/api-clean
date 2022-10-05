FROM node:16.17
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --only=prod