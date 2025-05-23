import redis from 'redis'
import { REDIS_URL, SESSION_SECRET, NODE_ENV } from './config.js'
import session from 'express-session'
import RedisStore from 'connect-redis'

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
    httpOnly: true,
    secure: NODE_ENV === 'development' ? false : true
  }
}

export {
  redisConf,
  redisClient,
}