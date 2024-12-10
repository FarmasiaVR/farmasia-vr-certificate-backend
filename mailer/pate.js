import axios from 'axios'

import logger from '../utils/logger'

import { PATE_URL } from '../utils/config.js'
import { inProduction, inStaging } from '../../config'

const settings = {
  hideToska: false,
  disableToska: true,
  color: '#107eab',
  header: 'Prethesis',
  headerFontColor: 'white',
  dryrun: !inProduction || inStaging,
}

const pateClient = axios.create({
  baseURL: PATE_URL,
  params: {
    token: process.env.API_TOKEN,
  },
})

const sendEmail = async (targets, text, subject) => {
  const emails = targets.map((to) => ({ to, subject }))

  const mail = {
    template: {
      from: 'Prethesis',
      text,
    },
    emails,
    settings,
  }

  logger.info(`Sending emails to ${targets.length} recipients`, {
    recipients: targets,
    subject,
    text,
  })

  await pateClient.post('/', mail)
}

export default sendEmail