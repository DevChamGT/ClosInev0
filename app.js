const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// Configurar el middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secreto123',
  resave: false,
  saveUninitialized: true
}));

// Definir las rutas
app.get('/', (req, res) => {
  res.render('index', { mensaje: req.session.mensaje });
  req.session.mensaje = null;
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  //console.log(password)

  /*bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
    } else {
      console.log(hash);
    }
  });*/

  // Verificar el nombre de usuario y la contraseña
  if (username === 'Cristopher' && bcrypt.compareSync(password, '$2b$10$1TKXVa9CBeb37STRE9R2WuQTUZKRTwkcSFJt5/xXvyIh60XeFNQmm')) {
    req.session.usuario = username;
    res.redirect('/inicio');
  } else {
    req.session.mensaje = 'Nombre de usuario o contraseña incorrectos';
    res.redirect('/');
  }
});

app.get('/inicio', (req, res) => {
  if (req.session.usuario) {
    res.render('inicio',{ usuario: req.session.usuario });
  } else {
    req.session.mensaje = 'Debe iniciar sesión para ver esta página';
    res.redirect('/');
  }
});

// Iniciar la aplicación en el puerto 3000
app.listen(3000, () => {
  console.log('La aplicación está escuchando en el puerto 3000');
});
