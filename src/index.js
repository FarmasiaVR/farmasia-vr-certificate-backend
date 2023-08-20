
const http = require('http');
const config = require('./config.js')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())


app.get("/", (req, res) => {
  res.send("Hello Word")
})

app.listen(config.PORT, config.URL, () => {
  console.log(`Server running at http://${config.URL}:${config.PORT}/`);
});

