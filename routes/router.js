import express from 'express'
import loginRouter from './loginRouter.js'
import certificateRouter from './certificateRouter.js'
import shibbolethMiddleware from '../utils/shibboleth.js'
import middleware from '../utils/middleware.js'

const router = express()

router.use(shibbolethMiddleware)
router.use('/certificates', certificateRouter)
router.use(middleware.sessionChecker)
router.use('/login', loginRouter)

export default router