
const http = require('http');
const config = require('./config.js')
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URL)
const {Certificate} = require('./models/certificate.js');
const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello Word")
})

app.post("/certificates/create", async (req, res) => {
    console.log(req.body)
    const newCertificate = new Certificate({
      user: req.body.user,
      tasks: req.body.tasks
    })
    await newCertificate.save()
    res.status(201).end()
})

app.get("/certificates", async (req, res) => {
  const certificates = await Certificate.find({})
  res.send(certificates)
})

app.listen(config.PORT, config.URL, () => {
  console.log(`Server running at http://${config.URL}:${config.PORT}/`);
});

