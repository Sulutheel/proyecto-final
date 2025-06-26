// express-backend/routes/login.js
import express from 'express';
import connectDB from '../db-mongodb.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await connectDB();
    const usuarios = db.collection('usuarios');

    const usuario = await usuarios.findOne({ email });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
      },
      token: 'token-falso',
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;
