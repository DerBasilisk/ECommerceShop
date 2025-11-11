import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userId:{type:String,require:true,unique:true},
    nombre:{type:String,require:true},
    apellido:{type:String,require:true},
    edad:{type:Number,require:true},
    telefono:{type:Number,require:true,maxlength:12},
    correo:{type:String,require:true},
    passwords:{type:String,require:true,minlenght:10}
});

const user = mongoose.model("user",userSchema,"user")

export default user;