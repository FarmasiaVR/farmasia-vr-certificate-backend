import logger from './logger.js'

const sessionChecker = (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  }

  const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

  export default { 
    sessionChecker,
    requestLogger
 }