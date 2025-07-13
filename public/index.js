import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// SERVIR ARCHIVOS ESTÁTICOS (HTML, CSS, JS)
app.use(express.static('public'));

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

// INICIO DEL SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
