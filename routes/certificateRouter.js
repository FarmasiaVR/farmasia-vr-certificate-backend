import express from 'express'
import Certificate from '../models/certificate.js'
const certificateRouter = express()


// Endpoint for receiving gameplay summaries and testing
// if the Authorization header is correct
certificateRouter.post("/create", async (req, res) => {
    console.log(req.body)
    const authorization = req.get('authorization')
    const info = await Certificate.findOne()

    if (authorization !== info.password) {
      console.log("Unauthorized")
      return res.send("Unauthorized")
    }

    console.log("Request is authorized")
    // Implemement logic for sending data to Pate service TBA
    // the email address is in info.email
    
    return res.status(201).end()
})


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

export default certificateRouter
