
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const propertyRoutes = require("./routes/propertyRoutes");
const clientRoutes = require("./routes/clientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");

// Registrar rutas
app.use("/api/properties", propertyRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);

// Página principal
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bienvenido a CASALIA",
    status: "Servidor funcionando correctamente"
  });
});

// Estado del servidor
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    database:
      mongoose.connection.readyState === 1
        ? "Conectada"
        : "Desconectada"
  });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

// Gestión de errores
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor"
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`CASALIA API funcionando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar CASALIA:", error.message);
    process.exit(1);
  }
};

startServer();
