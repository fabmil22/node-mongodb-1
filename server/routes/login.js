const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require ( 'jsonwebtoken' ) ;

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../modules/usuario');
const app = express()


app.post('/login' , function (req , res){


    let  body = req.body;
    
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



/* ------------------------ configutracion de google ------------------------ */
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    //console.log('payload: ', payload);
   return {
       nombre: payload.name,
       email: payload.email,
       picture: payload.picture,
       google: true
   }
  }
 


app.post('/google' , async (req , res)=>{

    let token = req.body.idtoken;
    let  googleUser = await verify(token).catch(
        e =>{
            return  res.status(403).json({
                ok:false,
                message: e
            });
        });

//verifica si en la base de datos existe  
    Usuario.findOne( {email: googleUser.email }, (err , usuariodb)=>{

        if (err){
            return res.status(500).json({
               ok:false,
               err
             });
          };

           console.log('EXISTE' , usuariodb);
          if (usuariodb){
            if (usuariodb.google === false){
                console.log('usuariodb.google: ', usuariodb.google);

                return res.status(400).json({
                    ok:false,
                    err :"debe de usuar su autentificacion normal"
                    
                  }
                  );
               } else {
                let token = jwt.sign({usuario: usuariodb},
                process.env.SEED_TOKEN,
                { expiresIn: process.env.CADUCIDAD_TOKEN});
                 return res.json({
                    ok: true,
                    usuario:  usuariodb,
                    token
        
                        });
               };
    
          } else {
          //si el usuadior no existe en nuestra base de datos
          let  usuario = new Usuario();

          usuario.nombre = googleUser.nombre;
          usuario.email = googleUser.email;
          usuario.img = googleUser.img;
          usuario.apellido = '';
          usuario.google = true;
          usuario.password = ':)';

          usuario.save((err , u)=>{

            if (err){
                return res.status(500).json({
                   ok:false,
                   err
                 });
              }

              let token = jwt.sign({
                usuario: usuariodb
            }, process.env.SEED_TOKEN,
            { expiresIn: process.env.CADUCIDAD_TOKEN})

             return res.json({
                ok: true,
                usuario:  usuariodb,
                token
    
                    })  



          })

          }
          
          }
          )


        });


module.exports = app


