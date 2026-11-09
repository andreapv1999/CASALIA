
const Appointment = require("../models/Appointment");

// Obtener todas las visitas
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("property", "title price location")
      .populate("client", "name email phone")
      .populate("agent", "name email")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      total: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las visitas"
    });
  }
};

// Crear visita
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Visita creada correctamente",
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar visita
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Visita no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visita actualizada correctamente",
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar visita
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Visita no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visita eliminada correctamente"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No se pudo eliminar la visita"
    });
  }
};
