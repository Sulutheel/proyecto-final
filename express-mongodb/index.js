import express from 'express';
import cors from 'cors';
import registroRouter from './routes/registro.js';

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Para parsear JSON en body

app.use('/api', registroRouter); // Prefijo /api

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
