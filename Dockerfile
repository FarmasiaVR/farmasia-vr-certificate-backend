FROM node:16-alpine AS builder

# Build the frontend
WORKDIR /usr/src/ui
COPY ./farmasia-ui/package*.json ./
RUN npm ci
COPY ./farmasia-ui ./
RUN npm run build

# Build the backend
FROM node:16-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . ./

RUN mkdir -p ./public
COPY --from=builder /usr/src/ui/dist ./public

RUN chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3001

CMD ["node", "index.js"]
