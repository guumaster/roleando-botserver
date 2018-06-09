FROM alekzonder/puppeteer:latest

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --production

ENV NODE_ENV production
EXPOSE 3000

CMD  ["node", "src/start.js"]

