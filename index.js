const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Multer: manejo de archivos
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Conexión a MySQL (Railway u otro)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Ruta de prueba
app.get('/', (_, res) => res.send('Servidor WebClass funcionando.'));

// Login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en servidor' });
    if (results.length > 0) {
      res.json({ success: true, usuario: results[0] });
    } else {
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});


// Subida de archivos
app.post('/subir-archivo', upload.single('archivo'), (req, res) => {
  const { usuario_id } = req.body;
  const archivo_url = `/uploads/${req.file.filename}`;
  const tipo = req.file.mimetype;

  db.query('INSERT INTO archivos (usuario_id, archivo_url, tipo) VALUES (?, ?, ?)',
    [usuario_id, archivo_url, tipo],
    err => {
      if (err) return res.status(500).json({ message: "Error al guardar archivo" });
      res.json({ message: "Archivo subido con éxito" });
    });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
