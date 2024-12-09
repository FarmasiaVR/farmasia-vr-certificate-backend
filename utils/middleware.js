import logger from './logger.js'
import { NODE_ENV } from './config.js'

const sessionChecker = (req, res, next) => {
    if ( NODE_ENV === 'development' ) {
      req.user = {
        username: "test",
      }
    }
    if (req.user) {
      next()
    } else {
      res.redirect('/api/login/oidc')
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