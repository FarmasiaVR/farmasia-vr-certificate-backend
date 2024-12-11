import axios from 'axios'
import { PATE_URL, API_TOKEN } from '../utils/config.js'

const settings = {
  hideToska: false,
  disableToska: true,
  color: '#107eab',
  header: 'FarmasiaVR',
  headerFontColor: 'white',
  dryrun: false,
}

const pateClient = axios.create({
  baseURL: PATE_URL,
  params: {
    token: API_TOKEN,
  },
})

const sendEmail = async (targets, text, subject) => {
  const emails = targets.map((to) => ({ to, subject }))

  const mail = {
    template: {
      from: 'FarmasiaVR',
      text,
    },
    emails,
    settings,
  }

  console.log(`Sending email to ${targets}`)

  await pateClient.post('/', mail)
}

export default sendEmail