const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  // Leer el archivo HTML de la plantilla
  fs.readFile('index.html', (err, data) => {
    if (err) throw err;

    // Enviar la plantilla HTML con los iframes
    res.write(data);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/`);
});
