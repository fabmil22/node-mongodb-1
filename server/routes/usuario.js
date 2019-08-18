
const express = require('express');
const Usuario = require('../modules/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const app = express()

const { verificaToken, checkRole}  = require('../middlewares/autorization')


app.get('/usuario', verificaToken, (req, res) => {

  let desde = Number(req.query.desde) || 0;
  let limit = Number(req.query.limit) || 3;

Usuario.find({"estado":true} ,'email  role  estado  google nombre apellido' ).skip(desde).limit(limit)
    .exec((err , usuarios)=>{

            if (err){
              return res.status(400).json({
                ok:false,
                err
              });
            }
  Usuario.count({"estado":true}, (err, counter)=>{
          res.json({
            ok: true,
            usuarios,
            counter,
            mostrados: usuarios.length
          })

  })
          

    })

    
  })


   
  app.post('/usuario/',(req , res) => {
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
  
    

    app.put('/usuario/:id',verificaToken,  (req, res) =>{
        let id = req.params.id;

      let body = _.pick( req.params , [ 'nombre','apellido','email', 'img','role'] );
      Usuario.findOneAndUpdate( id , body, {new : true ,  runValidators: true, }, (err , usuarioDb) => {
      
      
        console.log('logrado', usuarioDb);
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


  
    app.delete('/usuario/:id',verificaToken,  (req, res) =>{
      let id = req.params.id;

      let status ={
        estado: false
      }
      Usuario.findOneAndUpdate( id, status, (err , usuario) => {
      
      

        if (err){
          return res.status(400).json({
             ok:false,
             err
           });
        }

        if (usuario === undefined || usuario === null){
          return res.status(400).json({
             ok:false,
             err:'usuario no existe'
           });
        }
        res.json({
          ok: true,
          usuario
              })
      })
    })
     

    module.exports = app