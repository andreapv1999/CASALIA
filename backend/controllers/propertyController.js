
const Property = require("../models/Property");

// Obtener todas las viviendas
exports.getProperties = async (req, res) => {
  try {
    const { type, operation, location, minPrice, maxPrice } = req.query;

    const filters = {};

    if (type) filters.type = type;
    if (operation) filters.operation = operation;
    if (location) filters.location = { $regex: location, $options: "i" };
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filters).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las viviendas"
    });
  }
};

// Obtener una vivienda por ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Vivienda no encontrada" });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(400).json({ message: "ID de vivienda no válido" });
  }
};

// Crear una vivienda
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vivienda creada correctamente",
      data: property
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar una vivienda
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Vivienda no encontrada" });
    }

    res.json({
      success: true,
      message: "Vivienda actualizada correctamente",
      data: property
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una vivienda
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Vivienda no encontrada" });
    }

    res.json({
      success: true,
      message: "Vivienda eliminada correctamente"
    });
  } catch (error) {
    res.status(400).json({ message: "No se pudo eliminar la vivienda" });
  }
};
