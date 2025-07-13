import express from 'express';
import cors from 'cors';
import connection from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// ENDPOINT DE LOGIN
app.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, contraseña]
    );

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        nombre: user.nombre,
        rol: "Estudiante"
      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// Fallback para cualquier ruta no API (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
