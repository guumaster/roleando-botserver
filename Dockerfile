FROM node:10-alpine

COPY . /app/

WORKDIR /app

RUN npm ci --production

EXPOSE 3000

CMD  ["node", "src/start.js"]
