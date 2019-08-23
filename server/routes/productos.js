const express = require('express');
const Producto = require('../modules/producto');
const _ = require('underscore')
const app = express()
const { verificaToken }  = require('../middlewares/autorization')

/* ---------------------------- obtener productos --------------------------- */

app.get( '/productos', verificaToken, (req, res)=>{

  let desde = Number(req.query.desde) || 0;
  let limit = Number(req.query.limit) || 5;

    Producto.find({}).skip(desde).limit(limit)
    .sort('nombre')
    .populate('usuario')
    .populate('categoria')
    .exec((err , productos)=> {

        if (err){
            return res.status(400).json({
              ok:false,
              err
            })
          };

          Producto.count(
            {"disponible":true}, 
            (err, counter) => {
                    res.json({
                    ok: true,
                    productos,
                    counter,
                    mostrados: productos.length
                    })
        }
    ); 



    })


})

/* ----------------------------- producto por id ---------------------------- */
app.get( '/productos/:id' , verificaToken, (req , res)=>{
    let id = req.params.id;
    let body = _.pick( req.params , [ 'categoria', 'descripcion', 'nombre', 'precioUni','usuario'] );

    Producto.findById( id )
    .populate('usuario')
    .populate('categoria')
    
    .exec( (err , productoDB) => {
        
        if (err){
            return res.status(400).json({
               ok:false,
               err
             });
          }

          res.json({
            ok: true,
            producto: productoDB
                })


    })

})


/* ---------------------- buscar producto segun termino --------------------- */

app.get('/productos/buscar/:termino', verificaToken, (req , res)=>{


  let termino = req.params.termino;
  let regx = new RegExp(termino , 'i');
  Producto.find({ nombre : regx})
  .populate('categoria','nombre')
  .exec((err , productos)=> {

      if (err){
          return res.status(400).json({
            ok:false,
            err
          })
        };

        Producto.count(
          {"disponible":true}, 
          (err, counter) => {
                  res.json({
                  ok: true,
                  productos,
                  counter,
                  mostrados: productos.length
                  })
      }
  ); 



  })





})

/* --------------------------- registrar productos -------------------------- */

app.post( '/productos',verificaToken, (req, res)=>{
    let  body = req.body
      
    let producto = new Producto({

        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria:  body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err , productosDb)=>{

        if (err){
          return res.status(500).json({
             ok:false,
             err
           });
        }
         res.json({
           ok: true,
           producto: productosDb
         })
      }) 

})


/* ----------------------- editar producto del stock ----------------------- */

app.put('/productos/:id' , verificaToken, (req , res)=>{
    let id = req.params.id;
    let  body = req.body;


    Producto.findOneAndUpdate( {_id : id} , {$set:{
        categoria:   body.categoria,
        nombre :     body.nombre,
        usuario:     req.usuario._id,
        descripcion: body.descripcion,
        disponible:  body.disponible,
        }}, (err , productodb) => {
        if (err){
            return res.status(400).json({
               ok:false,
               err
             });
          };

          res.json({
            ok: true,
            prodructo: productodb
                })  

    })


})

/* --------------------- cambiar el estado del producto --------------------- */

app.put('/finished_products/:id' , verificaToken, (req , res)=>{
    let id = req.params.id;
    let  body = req.body;


    Producto.findOneAndUpdate( {_id : id} , {$set:{
        disponible: false,
        }}, (err , productodb) => {
        if (err){
            return res.status(400).json({
               ok:false,
               err
             });
          };

          res.json({
            ok: true,
            prodructo: productodb
                })  

    })


})


module.exports = app;