import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
  nombreSuperHeroe: {
    type: String,
    required: [true, "El nombre del superhéroe es obligatorio"],
    trim: true,
    minlength: [3, "El nombre del superhéroe debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre del superhéroe no puede superar los 60 caracteres"],
  },
  nombreReal: {
    type: String,
    required: [true, "El nombre real es obligatorio"],
    trim: true,
    minlength: [3, "El nombre real debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre real no puede superar los 60 caracteres"],
  },
  edad: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [0, "La edad no puede ser negativa"],
  },
  planetaOrigen: {
    type: String,
    default: "Desconocido",
    trim: true,
  },
  debilidad: {
    type: String,
    trim: true,
    required: [true, "Debe especificarse la debilidad del superhéroe"],
    minlength: [3, "La debilidad debe tener al menos 3 caracteres"],
    maxlength: [60, "La debilidad no puede superar los 60 caracteres"],
  },
  poderes: {
    type: [String],
    validate: {
      validator: function (poderes) {
        return (
          Array.isArray(poderes) &&
          poderes.length > 0 &&
          poderes.every(
            (p) =>
              typeof p === "string" &&
              p.trim().length >= 3 &&
              p.trim().length <= 60
          )
        );
      },
      message: "Cada poder debe ser un string de 3 a 60 caracteres",
    },
    required: [true, "Debe tener al menos un poder"],
  },
  aliados: {
    type: [String],
    validate: {
      validator: function (aliados) {
        return aliados.every(
          (a) =>
            typeof a === "string" &&
            (a.trim().length === 0 || (a.trim().length >= 3 && a.trim().length <= 60))
        );
      },
      message: "Cada aliado debe ser un string de 3 a 60 caracteres o estar vacío",
    },
  },
  enemigos: {
    type: [String],
    validate: {
      validator: function (enemigos) {
        return enemigos.every(
          (e) =>
            typeof e === "string" &&
            (e.trim().length === 0 || (e.trim().length >= 3 && e.trim().length <= 60))
        );
      },
      message: "Cada enemigo debe ser un string de 3 a 60 caracteres o estar vacío",
    },
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: String,
    default: "Lucas Nieto ✨",
    trim: true,
  },
});

export default mongoose.model("SuperHero", superheroSchema, "Grupo-14");
