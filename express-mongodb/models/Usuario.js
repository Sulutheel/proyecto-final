const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // texto plano por ahora
});

module.exports = mongoose.model("Usuario", usuarioSchema);