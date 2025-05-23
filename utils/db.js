import { DEFAULT_EMAIL, DEFAULT_PASSWORD, PGCONNECTION } from './config.js'
import pg from 'pg'

const { Client } = pg

const client = new Client({
  connectionString: PGCONNECTION,
  ssl: {
    rejectUnauthorized: true
  }
})

await client.connect().then(() => {
  console.log("connected to postgres")
})
  .catch((err) => {
    console.log(err)
  })

// Creating the initial info in db with env values, if none exist
async function setupDatabase() {
  await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT UNIQUE, password TEXT)')
  const res = await client.query('SELECT email FROM users WHERE id = 1')
  if (res.rows.length === 0) {
    const sql = 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING email'
    const values = [DEFAULT_EMAIL, DEFAULT_PASSWORD]
    const res = await client.query(sql, values)
    console.log('set default email: ', res.rows[0])
  } else {
    console.log('found email: ', res.rows[0])
  }
}

export default setupDatabase

export const db_query = (text, params) => client.query(text, params)