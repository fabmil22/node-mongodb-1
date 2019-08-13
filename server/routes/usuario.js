
const express = require('express')
const app = express()


app.get('/usuario/', function (req, res) {
    res.json('getusuario')
  })
   
  app.post('/usuario/', function (req , res) {
      let  body = req.body
      console.log('body: ', req.body);
  
      if ( body.nombre === undefined){
          res.status(400).json({
            ok : false,
            mensaje: "el nombre es requerido"
   });
      }else{
        res.json({body})
      }
     
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