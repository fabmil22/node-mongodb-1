//------------------
//puerto
//-----------------------

process.env.PORT =   process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

conection = ( process.env.NODE_ENV  === 'dev') ? 'mongodb://127.0.0.1:27017/cafe' : process.env.MONGO_URI;




/* -------------------------------------------------------------------------- */
/*                            vencimiento del token                           */
/* -------------------------------------------------------------------------- */
process.env.CADUCIDAD_TOKEN =  parseInt(Date.now() / 1000) + 20 * 60;

/* -------------------------------------------------------------------------- */
/*                           seed de autentificacion                          */
/* -------------------------------------------------------------------------- */
process.env.SEED_TOKEN = process.env.SEED_TOKEN  || 'secret';