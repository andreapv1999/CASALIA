
const express = require("express");
const router = express.Router();

const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");

const {
  protect,
  authorizeRoles
} = require("../middleware/authMiddleware");

// Consulta pública de viviendas
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Gestión exclusiva para administradores
router.post("/", protect, authorizeRoles("admin"), createProperty);
router.put("/:id", protect, authorizeRoles("admin"), updateProperty);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProperty);

module.exports = router;
