import express from 'express';
import cors from 'cors';
import "./db/db.js";
import ProductosRouter from "./routes/productos.js";
import UserRouter from "./routes/user.js"

const app = express();


// Habilitar todas las rutas
app.use(cors());


// 🟢 Esto es iIuse(express.json());

// Rutas
app.get('/',(req,res)=>{
    res.send('Bienvenido al curso de node express');
});

app.use("/api/productos",ProductosRouter);
app.use("/api/user",UserRouter)

app.listen(8081,()=> console.log('servidor corriendo en http://localhost:8081'))