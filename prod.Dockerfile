FROM node:20-alpine AS builder

# Build the frontend
WORKDIR /usr/src/ui
COPY ./farmasia-ui/package*.json ./
RUN npm ci --omit-dev
COPY ./farmasia-ui ./
RUN npm run build

# Build the backend
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit-dev

COPY . ./

RUN mkdir -p ./public
COPY --from=builder /usr/src/ui/dist ./public

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
