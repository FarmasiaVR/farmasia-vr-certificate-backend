import {DEFAULT_EMAIL, DEFAULT_PASSWORD, MONGODB_URL} from './config.js'
import mongoose from 'mongoose'
import Certificate from '../models/certificate.js';

mongoose.connect(MONGODB_URL).then(() => {
    console.log("connected to database")
  })
  .catch((err) => {
    console.log(err)
  })
  
// Creating the initial info in db with env values
async function setupDatabase() {
  const newCertificate = new Certificate({
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD
  })
  await newCertificate.save()
}

export default setupDatabase