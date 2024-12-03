const config = require('./config.js')
const mongoose = require('mongoose');
const {Certificate} = require('../models/certificate.js');

mongoose.connect(config.MONGODB_URL).then(() => {
    console.log("connected to database")
  })
  .catch((err) => {
    console.log(err)
  })
  
// Creating the initial info in db with env values
async function setupDatabase() {
  const newCertificate = new Certificate({
    email: config.DEFAULT_EMAIL,
    password: config.DEFAULT_PASSWORD
  })
  await newCertificate.save()
}

module.exports = { setupDatabase }