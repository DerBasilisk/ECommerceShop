import express from "express";
import user from "../models/user.js"

const router = express.Router();

router.post("/register",async(req,res)=>{
    try{
        const {userId,nombre,apellido,edad,telefono,correo,passwords}=req.body;
        if (!userId || !nombre || !apellido || !edad || !telefono || !correo || !passwords){
            return res.status(400).json({message:"Todos los campos son obligatorios"});
        }
        
        //validar
        const existeuser =await user.find({correo});
        if (existeuser){
            return res.status(400).json({message: "El Usuario ya se encuentra registrado"});
        }

        //crear usuario
        const newuser = new user ({userId,nombre,apellido,edad,telefono,correo,passwords});
        await newuser.save();
        res.status(201).json({message:"Usuario Registrado con exito"})

    } catch(error){
        res.status(500).json({message:"error al registrar usuario",error:error.message});

    }
    
});

export default router;