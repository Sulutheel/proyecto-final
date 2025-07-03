// express-backend/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import registroRouter from './routes/registro.js';
import loginRouter from './routes/login.js';
import claveRoutes from './routes/clave.js';
import fotosRouter from './routes/fotos.js';


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rutas
app.use('/api', registroRouter);
app.use('/api', loginRouter);
app.use('/api/clave', claveRoutes);
app.use('/api/fotos', fotosRouter);

app.get('/', (req, res) => {
  res.send('Servidor Express con MongoDB está funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
