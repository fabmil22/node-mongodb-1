
const express = require('express');
const Usuario = require('../modules/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const app = express()



app.get('/usuario/', function (req, res) {
    res.json('getusuario')
  })
   
  app.post('/usuario/', function (req , res) {
      let  body = req.body
      
  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err , usuarioDb)=>{

    if (err){
      return res.status(400).json({
         ok:false,
         err
       });
    }

     res.json({
       ok: true,
       usuario: usuarioDb
     })
  })


     
    })
  
    

    app.put('/usuario/:id', function (req, res) {
        let id = req.params.id;

      let body = _.pick( req.body , [ 'nombre','apellido','email', 'img','role'] );
      Usuario.findOneAndUpdate( id , body, {new : true ,  runValidators: true, }, (err , usuarioDb) => {

        if (err){
          return res.status(400).json({
             ok:false,
             err
           });
        }

        res.json({
          ok: true,
          usuario: usuarioDb
              })
      })

      
    })


  
    app.delete('/usuario/', function (req, res) {
      res.json('delete usuario')
    })
     

    module.exports = app