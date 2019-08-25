const express = require('express');
const Producto = require('../modules/producto');
const Usuario = require('../modules/usuario');
const _ = require('underscore')
const path = require('path')
const { verificaToken, verificaTokenImg }  = require('../middlewares/autorization')
const fs = require('fs')
const app = express()



app.get('/img/:tipo/:img' ,verificaTokenImg , (req , res)=>{

    let tipo = req.params.tipo;
    let imagen = req.params.img;
   
    let referenteImg = (tipo === 'usuarios') ? Usuario : Producto;
    let imagenPathm = path.resolve(__dirname, `../../uploads/${tipo}/${imagen}`);
    let imagenPathDontFind = path.resolve(__dirname, `../assets/dontfind.png`);

    if (fs.existsSync( imagenPathm )) {
        
         res.sendFile( imagenPathm);


    } else{
        res.sendFile(imagenPathDontFind);
    }


})




module.exports = app;