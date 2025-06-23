// express-backend/routes/registro.js
import express from 'express';
import connectDB from '../db-mongodb.js';

const router = express.Router();

router.post('/registro', async (req, res) => {
  try {
    const db = await connectDB();
    const usuarios = db.collection('usuarios');

    const nuevoUsuario = req.body;

    const resultado = await usuarios.insertOne(nuevoUsuario);

    res.status(201).json({ message: 'Usuario registrado con éxito', id: resultado.insertedId });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

export default router;
