require('dotenv').config()


const PORT = process.env.PORT || 3001
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://root:example@mongo:27017/'
const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD

module.exports = {
    PORT,
    MONGODB_URL,
    DEFAULT_EMAIL,
    DEFAULT_PASSWORD
}