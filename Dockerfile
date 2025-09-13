FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache curl

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev"]
