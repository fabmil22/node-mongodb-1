const jwt  = require ( 'jsonwebtoken' ) ;

/* -------------------------------------------------------------------------- */
/*                               verificar token                              */
/* -------------------------------------------------------------------------- */

let verificaToken  = (req ,res , next)=>{

    let token = req.get('Authorization');

    jwt.verify(token ,process.env.SEED_TOKEN , (err , decoded)=>{
        if (err){
            return res.status(401).json({
              ok:false,
              err
            });
          }

          req.usuario = decoded.usuario;
          next();

    } )
     
};

let checkRole = (req ,res , next) =>{
  let role = req.usuario.role;


  if (role !=='ADMIN'){
   return res.json({
      ok:false,
      message: "el usuario no es administrador"
  })}

   next();
    
}



let verificaTokenImg  = (req ,res , next)=>{

  let token = req.query.token;

  jwt.verify(token ,process.env.SEED_TOKEN , (err , decoded)=>{
      if (err){
          return res.status(401).json({
            ok:false,
            err
          });
        }

        req.usuario = decoded.usuario;
        next();

  } )
   
};
module.exports = { verificaToken , checkRole, verificaTokenImg}