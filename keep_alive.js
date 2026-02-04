// keep_alive.js
import http from 'http';

export default function keep_alive() {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("I'm alive");
  }).listen(8080, () => {
    console.log('Keep-alive server running on port 8080');
  });
}