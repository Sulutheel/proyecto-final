// express-backend/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registroRoutes from './routes/registro.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', registroRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
