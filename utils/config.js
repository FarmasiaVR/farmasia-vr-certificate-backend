import * as dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3001
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://root:example@mongo:27017/'
export const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL
export const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD
export const OIDC_ISSUER = process.env.OIDC_ISSUER || ''
export const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || ''
export const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET || ''
export const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || ''
export const SESSION_SECRET = process.env.SESSION_SECRET || ''
export const REDIS_URL = process.env.REDIS_URL || ''

export const NODE_ENV = process.env.NODE_ENV

