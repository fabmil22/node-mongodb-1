//------------------
//puerto
//-----------------------

process.env.PORT =   process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

conection = ( process.env.NODE_ENV  === 'dev') ? 'mongodb://127.0.0.1:27017/cafe' :'mongodb+srv://cafe1:mil1000e@cluster0-hspno.gcp.mongodb.net/cafe?retryWrites=true&w=majority'




