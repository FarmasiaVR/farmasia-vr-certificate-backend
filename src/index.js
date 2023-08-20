
const http = require('http');
const config = require('./config.js')


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello World');
});

server.listen(config.PORT, config.URL, () => {
  console.log(`Server running at http://${config.URL}:${config.PORT}/`);
});