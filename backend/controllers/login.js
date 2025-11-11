import bcrypt from "bcrypt";
import user from "../models/user.js";

export const loginuser = async (req, res) => {
  try {
    const { correo, passwords } = req.body;

    // Validar campos
    if (!correo || !passwords) {
      return res.status(400).json({ message: "Correo y contraseña obligatorios" });
    }

    // Buscar usuario
    const usuario = await user.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no registrado" });
    }

    // Comparar contraseña
    const passwordcheck = await bcrypt.compare(passwords, usuario.passwords);
    if (!passwordcheck) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si todo está bien
    res.status(200).json({ message: "Ingreso exitoso", usuario: usuario.nombre });

  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
