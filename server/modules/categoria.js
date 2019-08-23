const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema =  mongoose.Schema;

let  scemaCategoria = new Schema({
    usuario: { type: Schema.Types.ObjectId,
         ref: 'Usuario', 
         required:  [  true , 'se requiere un apellido']
        },
    categoria :{
        type: String,
        required:  [ true, 'se requiere un nombre']   
    },
    descripcion :{
       type: String,
       required:  [ false, 'se requiere un apellido']   
   },
   codigo :{
       type: String,
       unique: true,
       required:  [ true, 'el codigo debe ser unico']   
   },
   estado:{
    type: Boolean,
    required: true,
    default :true
},
});


scemaCategoria.plugin(uniqueValidator , { message : '{PATH}  el codigo unico debe ser unico'})
module.exports = mongoose.model('Categoria' ,scemaCategoria);