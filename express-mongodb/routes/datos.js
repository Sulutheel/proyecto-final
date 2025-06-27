// routes/datos.js
import express from 'express';
import connectDB from '../db-mongodb.js';

const router = express.Router();

// Ejemplo: guardar datos (con fotos y claves)
router.post('/', async (req, res) => {
  try {
    const db = await connectDB();
    const datos = db.collection('Datos-Empireo');

    const nuevoDato = req.body; // fotos, claves, etc.
    const resultado = await datos.insertOne(nuevoDato);

    res.status(201).json({ mensaje: 'Dato guardado', id: resultado.insertedId });
  } catch (error) {
    console.error('❌ Error al guardar datos:', error);
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

export default router;
