import express from 'express'
import sendEmail from '../mailer/pate.js'
import middleware from '../utils/middleware.js'
import {db_query} from '../utils/db.js'

const certificateRouter = express()

const subject = "Student Completion Report - FarmasiaVR"


// Endpoint for receiving gameplay summaries and testing
// if the Authorization header is correct
certificateRouter.post("/create", async (req, res) => {
  console.log(req.body)
  const authorization = req.get('authorization')
  try {
    const info = await db_query('SELECT email, password FROM users WHERE id = 1')
    if (authorization !== info.rows[0].password) {
      console.log("Unauthorized")
      return res.status(403).send("Unauthorized")
    }

    console.log("Authorized")

    const student_email = req.body.email.toString();

    const scenario_name = req.body.scenario.toString();

    var mistakes = req.body.mistakes.length == 0 ? '<li>No general mistakes took place.</li>' : req.body.mistakes.reduce((list, item) => list.concat(`<li>${item.name.toString()}: \
                                                                              <b>-${item.pointsDeducted.toString()} points</b>\
                                                                         </li>`), '');
    var progress = req.body.progress.reduce((list, item) => list.concat(`<li>${item.name.toString()}</li>\
                                                                              <ul><li>Points awarded: <b>${item.awardedPoints.toString()}</b></li>\
                                                                                  ${item.completed ? '' : '<li>This step was <b>NOT</b> completed!</li>'} \
                                                                                  ${item.timeTaken == null ? '' : `<li>Time taken: ${item.timeTaken.toString()}</li>`}\
                                                                                  ${item.mistakes.length != 0 ? `<li>Task mistakes:</li><ul>${item.mistakes.reduce((accumulator, next) => accumulator.concat(`<li>${next.name.toString()}: <b>-${next.pointsDeducted.toString()} points</b></li>`), '')}</ul>` : ''}\
                                                                              </ul>`), '')

    const message = `A student with the email address <i>${student_email}</i> has completed scenario <b>${scenario_name}</b> in FarmasiaVR.
    
    Steps taken and points:
    
    <ul>${progress}</ul>

    General mistakes made:
    
    <ul>${mistakes}</ul>`;

    const target = [info.rows[0].email]
    await sendEmail(target, message, subject)

    return res.status(201).send("Message OK")
  }
  catch (e) {
    console.log("Error in certificate creation: ", e)
    return res.status(500).send("Internal error")
  }
})

certificateRouter.use(middleware.sessionChecker)

certificateRouter.put("/create_put", middleware.sessionChecker, async (req, res) => {
  var updateEmail = null
  var updatePassword = null

  if (req.body.email != '' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.email)) {
    updateEmail = req.body.email
  }
  if (req.body.password != '' && !/\s/.test(req.body.password)) {
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
