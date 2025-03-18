FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p ./public

COPY ./farmasia-ui/dist ./public

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3001

CMD ["npm", "run", "dev"]
