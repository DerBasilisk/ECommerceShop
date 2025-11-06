import express from 'express';
import cors from 'cors';

const app = express();

// Habilitar todas las rutas
app.use(cors());

// Rutas
app.get('/',(req,res)=>{
    
})