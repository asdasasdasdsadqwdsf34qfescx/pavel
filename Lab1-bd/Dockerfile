FROM node:alpine

WORKDIR /usr/src/app

COPY  . ./

RUN npm install express sqlite3
RUN npm install cors

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]