FROM node:latest

WORKDIR /trades/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]