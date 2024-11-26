const config = require('./config.js')
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URL).then(() => {
  console.log("connected to database")
})
.catch((err) => {
  console.log(err)
})

const {Certificate} = require('./models/certificate.js');
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded());

// Creating the initial info in db with env values
async function setupDatabase() {
  const newCertificate = new Certificate({
    email: config.DEFAULT_EMAIL,
    password: config.DEFAULT_PASSWORD
  })
  await newCertificate.save()
}

setupDatabase()

app.get("/", (req, res) => {
  res.send("Health check OK")
})

// Endpoint for receiving gameplay summaries
app.post("/certificates/create", async (req, res) => {
    console.log(req.body)
    const authorization = req.get('authorization')
    const backendInfo = await Certificate.findOne()

    if (authorization !== backendInfo.password) {
      console.log("Unauthorized")
      return res.send("Unauthorized")
    }

    console.log("Request is authorized")
    // Implemement logic for sending data to Pate service TBA
    // the email address is in backendInfo.email
    
    return res.status(201).end()
})

// Endpoint for changing either the pharmacy department receiving
// email address or the password to be inserted in game.
app.put("/certificates/create_put", async (req, res) => {

  // Create check for HY authentication 
  console.log(req.body)
  const updateCertificate = await Certificate.findOne()
  updateCertificate.email = req.body.email
  updateCertificate.password = req.body.password
  
  await updateCertificate.save()
  return res.status(201).end()
})

app.get("/certificates", async (req, res) => {

  // Create check for HY authentication 
  const certificateInfo = await Certificate.findOne({})
  return res.send(certificateInfo).end()
})

app.listen(config.PORT, () => {
  console.log(`Server running at ${config.PORT}`);
});

