import express from 'express'
import sendEmail from '../mailer/pate.js'
import middleware from '../utils/middleware.js'
import {db_query} from '../utils/db.js'

const certificateRouter = express()

const subject = "Certificate of Completion"


// Endpoint for receiving gameplay summaries and testing
// if the Authorization header is correct
certificateRouter.post("/create", async (req, res) => {
  console.log(req.body)
  const authorization = req.get('authorization')
  try {
    const info = await db_query('SELECT email, password FROM users WHERE id = 1')
    if (authorization !== info.rows[0].password) {
      console.log("Unauthorized")
      return res.send("Unauthorized")
    }

    console.log("Request is authorized")
    // Implemement logic for sending data to Pate service TBA
    // the email address is in info.email
    const message = "Testing Pate!"

    const target = [info.rows[0].email]
    await sendEmail(target, message, subject)

    return res.status(201).end()
  }
  catch (e) {
    console.log("Error in certificate creation: ", e)
    return res.status(500).end()
  }
})

certificateRouter.use(middleware.sessionChecker)

certificateRouter.put("/create_put", middleware.sessionChecker, async (req, res) => {
  var updateEmail = null
  var updatePassword = null

  if (req.body.email != '') {
    updateEmail = req.body.email
  }
  if (req.body.password != '') {
    updatePassword = req.body.password
  }

  const answer = await db_query('UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password) WHERE id = 1 RETURNING email', [updateEmail, updatePassword])
  console.log('changed email (and possibly pass): ', answer.rows[0])  
  
  return res.status(201).end()
})

certificateRouter.get("/", async (req, res) => {
  const certificateInfo = await db_query("SELECT email, password FROM users WHERE id = 1")
  return res.send(certificateInfo.rows[0]).end()
})

export default certificateRouter
