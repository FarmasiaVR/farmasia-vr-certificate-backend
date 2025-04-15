import express from 'express'
import logger from '../utils/logger.js'

const loginRouter = express()

loginRouter.get('/', async (req, res) => {
  try {
    logger.info('Reached login router')
    if (!req.user || !req.user["iamGroups"].includes("grp-farmasiavr-admin")) {
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
  req.session.destroy((err) => {
    if (err) return next(err)
  })

  res.redirect('/')
})

export default loginRouter