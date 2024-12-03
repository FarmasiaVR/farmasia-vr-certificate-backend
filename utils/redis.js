const redis = require('redis')
const { REDIS_URL } = require('./config')
const { SESSION_SECRET } = require('./config')
const session = require('express-session')
const RedisStore = require('connect-redis').default

const redisConnection = `redis://${REDIS_URL}`

const redisClient = redis.createClient({
  url: redisConnection,
  legacyMode: false
})

redisClient.on('ready', () => {
  console.log('Redis client connected')
})

redisClient.on('error', (err) => {
  console.error('Redis client error:', err)
});

(async () => { 
  try {
    await redisClient.connect()
  } catch (err) {
    console.error('Failed to connect to Redis:', err)
  }
})()

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:"
})

const redisConf = {
  store: redisStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}

module.exports = { redisClient, redisConf }