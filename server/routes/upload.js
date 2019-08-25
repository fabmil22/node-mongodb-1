const express = require('express');
const Usuario = require('../modules/usuario');
const Producto = require('../modules/producto');
const { verificaToken }  = require('../middlewares/autorization')
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload({
    useTempFiles : true,
    limits: { fileSize: 50 * 1024 * 1024 }
  }));

app.put('/upload/:tipo/:id',   (req, res) => {

   let  tipo = req.params.tipo;
   let  id = req.params.id;
   console.log('req.files: ', req.files, tipo , id);
    if (!req.files) {
       
      return res.status(400).json({
          ok: false,
          message: "no se ha seleccionado archivo"
      });
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   let sampleFile = req.files.archivo;
   let nameFile =` ${id}_${sampleFile.name}_${Math.random()}.jpg`
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv( `./uploads/${tipo}/${nameFile}`, function(err) {
      if (err)
        return res.status(500).json({
            ok:false,
            error: err
        });
  
        ImagenUsuario (id , res ,nameFile, tipo);
    });
  });


  function ImagenUsuario (id , res , nombre , tipo){

   let referencia = (tipo === 'usuarios')? Usuario : Producto;

   referencia.findById( id , (err , usuariodb)=>{

        if (err)
        return res.status(500).json({
            ok:false,
            error: err
        });

       if(!usuariodb) 
       return res.status(500).json({
        ok:false,
        error: 'no existe el usuario'
         });

     let imagenPathm = path.resolve(__dirname, `../../uploads/${tipo}/${usuariodb.img}`);
     borrarArchivo( imagenPathm , res , tipo, usuariodb);
     savefile(nombre, res, usuariodb);
     
       }
    )
  }

  function borrarArchivo( imagenPathm , res , tipo ,usuariodb){

    /* ------------------------- si el archivo ya existe ------------------------ */

   if (fs.existsSync( imagenPathm )) {
  

    /* -------------------------- eliminamos el archivo ------------------------- */
    
        fs.unlink(`./uploads/${tipo}/${usuariodb.img}`, function (err) 
        { 
          if (err) 
          { return res.status(500).json({
            ok:false,
            error: err}) } 
         console.log('File has been Deleted') });
    
       }
  }

  function savefile(nombre, res ,usuariodb) {

    usuariodb.img = nombre;
    usuariodb.save( (err , usuarioguardado)=>{

        if (err)
        return res.status(500).json({
            ok:false,
            error: err
        }
        );

        return res.json({
            ok:true,
            message: 'la imagen fue  actualizada del usuario',
            usuario : usuarioguardado,
            img: nombre
        });

    })
  }

  module.exports = app;

  