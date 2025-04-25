import express from 'express'
import session from 'express-session'
import cors from 'cors'
import path from 'path'
import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'

import { PORT, NODE_ENV } from './utils/config.js'

import setupDatabase from './utils/db.js'
import { redisConf, redisClient } from './utils/redis.js'
import middleware from './utils/middleware.js'

import router from './routes/router.js'

// this is due to OpenShift Shibboleth routing, which uses /farmasiavr
// in OpenShift, in local the /farmasiavr needs to be added
const baseUrl = NODE_ENV === 'development' ? '/farmasiavr' : '';

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(middleware.requestLogger)
app.use(session(redisConf))

const limiter = rateLimit({
  // Rate limiter configuration
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: false, // Disable `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers

  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args)
  }),
})

app.get(`${baseUrl}/health`, (req, res) => {
  res.send("Health check OK")
})

app.use(`${baseUrl}/api`, (req, res, next) => router(req, res, next))
app.use(`${baseUrl}/api`, (_, res) => res.sendStatus(404))

app.use(middleware.sessionChecker)

app.get(`${baseUrl}/version`, (req, res) => {
  res.send(process.env.npm_package_version)
})

const DIST_PATH = path.resolve('public')
const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

app.use(`${baseUrl}`, express.static(DIST_PATH))
app.get(`${baseUrl}/*`, (_, res) => res.sendFile(INDEX_PATH))

app.listen(PORT, async () => {
  await setupDatabase()

  console.log(`Server running at ${PORT}`);
});