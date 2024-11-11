require('dotenv').config()


const PORT = process.env.PORT || 3001
const URL = process.env.URL
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://root:example@mongo:27017/'
const EMAIL = process.env.EMAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const RECIPIENT = process.env.RECIPIENT

module.exports = {
    PORT,
    URL,
    MONGODB_URL,
    EMAIL,
    EMAIL_PASSWORD,
    RECIPIENT
}