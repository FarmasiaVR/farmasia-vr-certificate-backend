
const config = require('./config.js')
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

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


app.get("/", (req, res) => {
  res.send("Health check OK")
})

app.post("/certificates/create", async (req, res) => {
    console.log(req.body)
    const newCertificate = new Certificate({
      user: req.body.user,
      tasks: req.body.tasks
    })
    await newCertificate.save()
    try {
      sendEmail(req.body.user, req.body.tasks)
    }
    catch {
      console.log("error sending email")
    }
    return res.status(201).end()
})

app.put("/certificates/create_put", async (req, res) => {
  console.log(req.body)
  const newCertificate = new Certificate({
    user: req.body.user,
    tasks: req.body.tasks
  })
  await newCertificate.save()
  return res.status(201).end()
})

app.get("/certificates", async (req, res) => {
  const certificates = await Certificate.find({})
  return res.send(certificates).end()
})

app.listen(config.PORT, () => {
  console.log(`Server running at ${config.PORT}`);
});

const sendEmail = async (user, items) => {
  try {
    let emailAddress = config.RECIPIENT

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD
      }
    })

    const emailText = `Test email`

    const mailOptions = {
      from: config.EMAIL,
      to: emailAddress,
      subject: 'TEST EMAIL',
      text: emailText
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  } catch (error) {
    console.error(error)
  }
}
