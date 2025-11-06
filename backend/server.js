import express from 'express';
import cors from 'cors';
import "./db/db.js";
import ProductosRouter from "./routes/productos.js";

const app = express();

// Habilitar todas las rutas
app.use(cors());

// Rutas
app.get('/',(req,res)=>{
    res.send('Bienvenido al curso de node express');
});

app.listen(8081,()=> console.log('servidor corriendo en http://localhost:8081'))

app.use("/api/productos",ProductosRouter)