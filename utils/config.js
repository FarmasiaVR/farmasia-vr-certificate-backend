import * as dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3001
export const PGCONNECTION = process.env.PGCONNECTION
export const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL
export const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD

export const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'
export const REDIS_URL = process.env.REDIS_URL

export const NODE_ENV = process.env.NODE_ENV

export const PATE_URL = process.env.PATE_URL

export const API_TOKEN = process.env.API_TOKEN || ''