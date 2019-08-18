const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require ( 'jsonwebtoken' ) ; 
const Usuario = require('../modules/usuario');
const app = express()


app.post('/login' , function (req , res){


    let  body = req.body;
    //




    if(body.email){

        Usuario.findOne({email:body.email } , (err , usuariodb) =>{

            if (err){
                return res.status(500).json({
                   ok:false,
                   err
                 });
              }

            if (!usuariodb){
    
                return res.status(400).json({ 
                 ok: false,
                 message : "direccion no existe dentro de la base de datos"
                })
            }

            if (!bcrypt.compareSync( body.password , usuariodb.password)){

               return res.status(400).json({ 
                     ok: false,
                     message : "password no es correcto"
                    })
            }


            let token = jwt.sign({
                usuario: usuariodb
            }, process.env.SEED_TOKEN,
            { expiresIn: process.env.CADUCIDAD_TOKEN})
            res.json({
                ok: true,
                usuario:  usuariodb,
                token
    
                    })



        })
        
       
       
    }

   


});









module.exports = app


