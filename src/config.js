require('dotenv').config()


const PORT = process.env.PORT
const URL = process.env.URL
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {
    PORT,
    URL,
    MONGODB_URL
}