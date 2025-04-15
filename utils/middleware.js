import logger from './logger.js'
import { NODE_ENV } from './config.js'


const parseIamGroups = (iamGroups) =>
  iamGroups?.split(';').filter(Boolean) ?? []

const sessionChecker = (req, res, next) => {
  if (NODE_ENV === 'development') {
    req.user = {
      hygroupcn: "grp-farmasiavr-admin",
    }
    return next()
  }

  const { hygroupcn } = req.headers
  const iamGroups = parseIamGroups(hygroupcn)

  const user = {
    iamGroups,
  }

  req.user = user
  return next()
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