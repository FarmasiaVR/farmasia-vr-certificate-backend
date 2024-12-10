import axios from 'axios'
import logger from '../utils/logger'
import { PATE_URL } from '../utils/config.js'

const settings = {
  hideToska: false,
  disableToska: true,
  color: '#107eab',
  header: 'Prethesis',
  headerFontColor: 'white',
  dryrun: true,
}

const pateClient = axios.create({
  baseURL: PATE_URL,
  params: {
    token: process.env.API_TOKEN,
  },
})

const sendEmail = async (target, text, subject) => {
  const email = target

  const mail = {
    template: {
      from: 'Prethesis',
      text,
    },
    email,
    settings,
  }

  logger.info(`Sending emails to ${targets.length} recipients`, {
    recipients: target,
    subject,
    text,
  })

  await pateClient.post('/', mail)
}

export default sendEmail