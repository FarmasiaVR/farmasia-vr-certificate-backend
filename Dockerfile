FROM node:20-alpine AS builder

# Build the frontend
WORKDIR /usr/src/ui
COPY ./farmasia-ui/package*.json ./
RUN npm ci --omit-dev
COPY ./farmasia-ui ./
RUN npm run build

# Build the backend
FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit-dev

COPY . ./

RUN mkdir -p ./public
COPY --from=builder /usr/src/ui/dist ./public

RUN chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3001

CMD ["npm", "start"]
