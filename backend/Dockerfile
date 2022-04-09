FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY backend/package*.json ./
COPY .env ./

USER node

RUN npm install

ADD --chown=node:node backend ./

EXPOSE 3000

CMD [ "/home/node/app/node_modules/.bin/ts-node-dev", "index.ts"]