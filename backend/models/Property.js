
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: ["piso", "casa", "chalet", "atico", "local"],
      required: true
    },
    operation: {
      type: String,
      enum: ["venta", "alquiler"],
      required: true
    },
    location: { type: String, required: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, required: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["disponible", "reservada", "vendida", "alquilada"],
      default: "disponible"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
