
const express = require("express");
const router = express.Router();

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require("../controllers/clientController");

const {
  protect,
  authorizeRoles
} = require("../middleware/authMiddleware");

// Todas las rutas de clientes requieren permisos de administrador
router.use(protect, authorizeRoles("admin"));

router.get("/", getClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
