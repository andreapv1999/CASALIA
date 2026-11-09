
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    interest: {
      type: String,
      enum: ["compra", "alquiler"],
      required: true
    },
    budget: { type: Number, default: 0 },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
