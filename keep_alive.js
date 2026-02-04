// keep_alive.js
const http = require('http');

// สร้าง server เล็ก ๆ เพื่อ prevent bot sleep
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("I'm alive");
  res.end();
}).listen(8080, () => {
  console.log('Keep-alive server running on port 8080');
});
