// express-backend/index.js
import express from 'express';
import cors from 'cors';
import registroRouter from './routes/registro.js';
import loginRouter from './routes/login.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', registroRouter);
app.use('/api', loginRouter);

app.get('/', (req, res) => {
  res.send('Servidor Express con MongoDB está funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
