
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pendiente", "confirmada", "realizada", "cancelada"],
      default: "pendiente"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
