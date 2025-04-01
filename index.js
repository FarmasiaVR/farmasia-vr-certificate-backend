import express from 'express'
import session from 'express-session'
import cors from 'cors'
import path from 'path'

import { PORT, NODE_ENV } from './utils/config.js'

import setupDatabase from './utils/db.js'
import redisConf from './utils/redis.js'
import middleware from './utils/middleware.js'

import router from './routes/router.js'

// this is due to OpenShift Shibboleth routing, which uses /farmasiavr
// in OpenShift, in local and staging the /farmasiavr needs to be added
const baseUrl = NODE_ENV != 'production' ? '' : '/farmasiavr';

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded());
app.use(middleware.requestLogger)
app.use(session(redisConf))

app.use(`${baseUrl}/api`, (req, res, next) => router(req, res, next))
app.use(`${baseUrl}/api`, (_, res) => res.sendStatus(404))

app.get(`${baseUrl}/health`, (req, res) => {
  res.send("Health check OK")
})

const DIST_PATH = path.resolve('public')
const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

app.use(middleware.sessionChecker)
app.use(`${baseUrl}`, express.static(DIST_PATH))
app.get(`${baseUrl}/*`, (_, res) => res.sendFile(INDEX_PATH))

app.listen(PORT, async () => {
  await setupDatabase()

  console.log(`Server running at ${PORT}`);
});