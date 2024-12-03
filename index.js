const config = require('./utils/config.js')
const express = require('express')
const session = require('express-session')
const cors = require('cors');
const passport = require('passport')

const loginRouter = require('./routes/loginRouter')
const certificateRouter = require('./routes/certificateRouter')

//const setupAuthentication = require('./utils/oidc')
const { setupDatabase } = require('./utils/db')
const { redisConf } =require('./utils/redis')
const middleware = require('./utils/middleware')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded());
app.use(middleware.requestLogger)
app.use(session(redisConf))
//app.use(passport.initialize())
//app.use(passport.session())

app.use('/api/login', loginRouter)
app.use('/api/certificates', certificateRouter)

app.get("/health", (req, res) => {
  res.send("Health check OK")
})

// app.use(express.static("./dist"))

app.listen(config.PORT, async () => {
  // await setupAuthentication()
  await setupDatabase()

  console.log(`Server running at ${config.PORT}`);
});