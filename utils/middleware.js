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
  
  const authorized = req.user["iamGroups"].includes("grp-farmasiavr-admin")

  try {
    logger.info('Reached login router')
    logger.info('Req user:', req.user)
    if (!authorized) {
      return res.status(401).send('Unauthorized. Your University of Helsinki AD account is not a member of the grp-farmasiavr-admin IAM group.')
    }
    return next()
  } catch (error) {
    console.error('Error in login route:', error)
    return res.status(500).send('Internal Server Error')
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