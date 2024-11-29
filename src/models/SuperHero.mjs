import mongoose from "mongoose";

// Definimos el esquema para los superhéroes
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
  aliados: [{ type: String, trim: true }],
  enemigos: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: String,
    default: "Lucas Nieto ✨",
    trim: true,
  },
});

// Exportamos el modelo asociado a la colección "Grupo-14"
export default mongoose.model("SuperHero", superheroSchema, "Grupo-14");
