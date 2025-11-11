import express, { json } from "express";
import Productos from "../models/productos.js";

const router = express.Router();

router.post("/",async function(req,res){
    try{
        const{productId,nombre,descripcion,precio,imagen}=req.body;
        const newProduct=new Productos({
            productId,
            nombre,
            descripcion,
            precio,
            imagen
        });
        await newProduct.save();
        res.status(201).json({mesagge:"producto guardado con exito"});
    } catch(error) {
        console.error("Error al guardar el producto",error);
        res.status(400).json({mesagge:"Error al ingresar el producto"});
    }
});

// Datos de la base de datos
router.get("/",async(req,res) => {
    try{const productos = await Productos.find();
        res.json(productos);

    } catch (error) {
        res.status(500).json({mesagge:"Error al obtener los productos"});
    }
});

export default router;