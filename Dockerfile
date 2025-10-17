FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

# RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "run", "start"]