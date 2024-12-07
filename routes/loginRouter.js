import express from 'express'
import passport from 'passport'

const loginRouter = express()

loginRouter.get('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send('Unauthorized')
    }
    return res.send(req.user)
  } catch (error) {
    console.error('Error in login route:', error)
    return res.status(500).send('Internal Server Error')
  }
})

loginRouter.get('/oidc', (req,res, next) => {
  if (req.user) {
    res.redirect('/')
  } else {
    passport.authenticate('oidc')(req, res, next)
  }
})


loginRouter.get(
  '/callback',
  passport.authenticate('oidc', { 
    failureRedirect: '/',
    failureMessage: true,
    successRedirect: '/'
   }),
  (_, res) => {
    res.redirect('/')
  }
)

loginRouter.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
  })

  res.redirect('/')
})

export default loginRouter