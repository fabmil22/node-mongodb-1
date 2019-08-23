const express = require('express');
const Categoria = require('../modules/categoria');

const _ = require('underscore')

const app = express()
const { verificaToken }  = require('../middlewares/autorization')



/* --------------------------- mostrar categorias --------------------------- */
app.get('/categoria' , verificaToken, (req , res)=>{
    Categoria.find({}).sort('categoria')
    .populate('usuario' , 'nombre role')
    .exec((err , categorias)=> {
        if (err){
            return res.status(400).json({
              ok:false,
              err
            })
          };

          Categoria.count(
            {"estado":true}, 
            (err, counter) => {
                    res.json({
                    ok: true,
                    categorias,
                    counter,
                    mostrados: categorias.length
                    })
        }
    );

      }
)

}
    )
   
    

        
   
      


/* --------------------------- mostrar categorias  por id--------------------------- */
app.get( '/categoria/:id' , verificaToken, (req , res)=>{
    let id = req.params.id;
    let body = _.pick( req.params , [ 'categoria', 'descripcion', 'codigo', 'estado'] );

    Categoria.findOneAndUpdate( id , body, {new : true ,  runValidators: true, }, (err , categoriaDB) => {
        
        if (err){
            return res.status(400).json({
               ok:false,
               err
             });
          }

          res.json({
            ok: true,
            categoria: categoriaDB
                })


    })

})


/* ----------------------------- crear categotia ---------------------------- */
app.post('/categoria/' , verificaToken, (req , res)=>{
    let  body = req.body;


    let categoria = new Categoria({
        usuario: req.usuario._id,
        categoria: body.categoria,
        descripcion: body.descripcion,
        codigo: body.codigo
      });


      categoria.save((err , categoriaDb)=>{

        if (err){
          return res.status(500).json({
             ok:false,
             err
           });
        }
    
        if (err){
          return res.status(500).json({
             ok:false,
             err
           });
        }
         res.json({
           ok: true,
           categoria: categoriaDb
         })
      })  

})

/* ---------------------------- editar categoria ---------------------------- */
app.put('/categoria/:id' , verificaToken, (req , res)=>{
    let id = req.params.id;
    let  body = req.body;
    //let body = _.pick( req.params , [ 'categoria', 'descripcion', 'codigo', 'estado'] );

    Categoria.findOneAndUpdate( {_id : id} , {$set:{
        categoria: body.categoria,
        descripcion: body.descripcion,
        estado: body.email,
        codigo: body.codigo}}, (err , categoriaDb) => {
        if (err){
            return res.status(400).json({
               ok:false,
               err
             });
          };

          res.json({
            ok: true,
            categoria: categoriaDb
                })  

    })


})

/* --------------------------- eliminar categoria --------------------------- */

app.delete('/categoria/:id' , verificaToken, (req , res)=>{
  let id = req.params.id;
  let  body = req.body;
  //let body = _.pick( req.params , [ 'categoria', 'descripcion', 'codigo', 'estado'] );

  Categoria.findOneAndUpdate( {_id : id} , {$set:{estado: false,
      }}, (err , categoriaDb) => {
      if (err){
          return res.status(400).json({
             ok:false,
             err
           });
        };

        res.json({
          ok: true,
          categoria: categoriaDb
              })  

  })


})

module.exports = app;