
const express = require('express')
const Usuario = require('../modules/usuario')
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
    password: body.password,
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
      res.json({
          id
      })
    })
  
    app.delete('/usuario/', function (req, res) {
      res.json('delete usuario')
    })
     

    module.exports = app