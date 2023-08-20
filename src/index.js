
const http = require('http');
const config = require('./config.js')
const express = require('express')
const app = express()


app.get("/", (req, res) => {
  res.send("Hello Word")
})


app.listen(config.PORT, config.URL, () => {
  console.log(`Server running at http://${config.URL}:${config.PORT}/`);
});

