const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');




let Schema =  mongoose.Schema;

let  rOlesValidos ={
    values: ['ADMIN', 'USER'],
    message: '{VALUE, NO ES UN ROLE VALIDO}'
};

let  scemaUsuario = new Schema({
     nombre :{
         type: String,
         required:  [ true, 'se requiere un nombre']   
     },
     apellido :{
        type: String,
        required:  [ false, 'se requiere un apellido']   
    },
    email :{
        type: String,
        unique: true,
        required:  [ true, 'es  requerido el correo']   
    },
    password :{
        type: String,
        required:  [ true, 'es password es requerido']   
    },
    img :{
        type: String,
        required:  false  
    },
    role :{
        type: String,
        required: true,
        default :'USER',
        enum: rOlesValidos  
    },
    estado:{
        type: Boolean,
        required: true,
        default :true
    },
    google:{
        type: Boolean,
        required: true,
        default : false 
     
    }

});


//para no mostrar la contreseña  en la respuesta  del post

scemaUsuario.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

 scemaUsuario.plugin(uniqueValidator , { message : '{PATH}  el correo electronico debe ser unico'})

module.exports = mongoose.model('Usuario' ,scemaUsuario);