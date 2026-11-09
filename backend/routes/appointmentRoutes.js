
const express = require("express");
const router = express.Router();

const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require("../controllers/appointmentController");

const {
  protect,
  authorizeRoles
} = require("../middleware/authMiddleware");

// Todas las operaciones de citas requieren administrador
router.use(protect, authorizeRoles("admin"));

router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
