import express from 'express'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import path from 'path'

import { PORT } from './utils/config.js'

import setupAuthentication from './utils/oidc.js'
import setupDatabase from './utils/db.js'
import redisConf from './utils/redis.js'
import middleware from './utils/middleware.js'

import router from './routes/router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded());
app.use(middleware.requestLogger)
app.use(session(redisConf))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

app.get("/health", (req, res) => {
  res.send("Health check OK")
})

const DIST_PATH = path.resolve('public')
const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

app.use(middleware.sessionChecker)
app.use(express.static(DIST_PATH))
app.get('*', (_, res) => res.sendFile(INDEX_PATH))

app.listen(PORT, async () => {
  await setupDatabase()
  await setupAuthentication()

  console.log(`Server running at ${PORT}`);
});