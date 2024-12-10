import express from 'express'
import loginRouter from './loginRouter.js'
import certificateRouter from './certificateRouter.js'

const router = express()

router.use('/login', loginRouter)
router.use('/certificates', certificateRouter)

export default router