// backend/routes/clave.js
import express from "express";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const url = process.env.MONGO_URI || "mongodb://localhost:3000/empireo";
const client = new MongoClient(url);
const db = client.db("empireo");
const usuarios = db.collection("usuarios");

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no enviado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

// GET /api/clave → obtener clave
router.get("/", verificarToken, async (req, res) => {
  const usuario = await usuarios.findOne({ _id: new ObjectId(req.userId) });
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json({ clave: usuario.clave || null });
});

// POST /api/clave → guardar clave
router.post("/", verificarToken, async (req, res) => {
  const { clave } = req.body;
  if (!clave) return res.status(400).json({ error: "Clave requerida" });

  await usuarios.updateOne(
    { _id: new ObjectId(req.userId) },
    { $set: { clave } }
  );
  res.json({ mensaje: "Clave guardada" });
});

export default router;
