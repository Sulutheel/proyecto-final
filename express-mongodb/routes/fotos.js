import express from "express";
import multer from "multer";
import path from "path";
import { ObjectId } from "mongodb";
import connectDB from "../db-mongodb.js";

const router = express.Router();

// Configuración multer para guardar archivos en carpeta "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Puedes personalizar la carpeta aquí
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Genera un nombre único
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Obtener fotos de un usuario por su ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await connectDB();
    const fotosCollection = db.collection("fotos");

    const fotos = await fotosCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    res.json({ fotos });
  } catch (error) {
    console.error("Error al obtener fotos:", error);
    res.status(500).json({ error: "Error al obtener fotos" });
  }
});

// Subir foto
router.post("/", upload.single("foto"), async (req, res) => {
  try {
    const { userId, url, categoria, plataforma } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Falta userId" });
    }

    const db = await connectDB();
    const fotosCollection = db.collection("fotos");

    let fotoData = {
      userId: new ObjectId(userId),
      categoria: categoria || "otros",
      fecha: new Date(),
    };

    if (url) {
      // Si la foto es por URL
      fotoData.url = url;
      if (plataforma) fotoData.plataforma = plataforma;
    } else if (req.file) {
      // Si la foto se subió como archivo
      fotoData.nombreArchivo = req.file.filename;
      if (plataforma) fotoData.plataforma = plataforma;
    } else {
      return res.status(400).json({ error: "Falta foto o URL" });
    }

    const resultado = await fotosCollection.insertOne(fotoData);

    res.json({
      message: "Foto guardada",
      nuevaFoto: { _id: resultado.insertedId, ...fotoData },
    });
  } catch (error) {
    console.error("Error al subir foto:", error);
    res.status(500).json({ error: "Error al subir foto" });
  }
});

export default router;
