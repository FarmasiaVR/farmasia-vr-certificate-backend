const certificateRouter = require('express').Router()
const mongoose = require('mongoose');
const {Certificate} = require('../models/certificate.js');

// Endpoint for receiving gameplay summaries
certificateRouter.post("/create", async (req, res) => {
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
certificateRouter.put("/create_put", async (req, res) => {
  console.log(req.body)
  const updateCertificate = await Certificate.findOne()
  updateCertificate.email = req.body.email
  updateCertificate.password = req.body.password
  
  await updateCertificate.save()
  return res.status(201).end()
})

certificateRouter.get("/", async (req, res) => {
  const certificateInfo = await Certificate.findOne({})
  return res.send(certificateInfo).end()
})

module.exports = certificateRouter
