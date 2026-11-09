
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener al menos 8 caracteres"
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Este correo ya está registrado"
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: "client"
    });

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Introduce correo y contraseña"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas"
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Inicio de sesión correcto",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión"
    });
  }
};
