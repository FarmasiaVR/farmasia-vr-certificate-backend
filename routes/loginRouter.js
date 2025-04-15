import express from 'express'

const loginRouter = express()

loginRouter.get('/', async (req, res) => {
  try {
    logger.info('Reached login router')
    if (!req.user) {
      return res.status(401).send('Unauthorized')
    }
    logger.info('Req user:', req.user)
    return res.send(req.user)
  } catch (error) {
    console.error('Error in login route:', error)
    return res.status(500).send('Internal Server Error')
  }
})

loginRouter.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
  })

  res.redirect('/')
})

export default loginRouter