require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://root:example@mongo:27017/'
const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD
const REDIS_HOST = process.env.REDIS_HOST || 'redis'

const OIDC_ISSUER = process.env.OIDC_ISSUER || ''
const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || ''
const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET || ''
const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || ''
const SESSION_SECRET = process.env.SESSION_SECRET || ''
const REDIS_URL = process.env.REDIS_URL || ''

module.exports = {
    PORT,
    MONGODB_URL,
    DEFAULT_EMAIL,
    DEFAULT_PASSWORD,
    REDIS_HOST,
    OIDC_ISSUER,
    OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET,
    OIDC_REDIRECT_URI,
    SESSION_SECRET,
    REDIS_URL
}