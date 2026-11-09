
const Client = require("../models/Client");

// Obtener todos los clientes
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .populate("assignedAgent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los clientes"
    });
  }
};

// Obtener un cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ID de cliente no válido"
    });
  }
};

// Crear cliente
exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);

    res.status(201).json({
      success: true,
      message: "Cliente creado correctamente",
      data: client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar cliente
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cliente actualizado correctamente",
      data: client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar cliente
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cliente eliminado correctamente"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No se pudo eliminar el cliente"
    });
  }
};
