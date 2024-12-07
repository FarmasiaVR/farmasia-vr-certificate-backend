FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p ./public

COPY ./farmasia-ui/dist ./public

RUN chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3001

CMD ["npm", "run", "dev"]
