require('./config/config');

const express = require('express')
const app = express()
const path =  require('path')

const  bodyParser = require('body-parser')
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( express.static(path.resolve(__dirname , '../public')))

app.use( require('./routes/index'))

//connect bd
  mongoose.connect(conection, 
  (err , res)=>{
  if ( err) throw err;
  console.log('base de datos online');

  });
app.listen(process.env.PORT, () => {
    console.log('conectado al puerto : ', process.env.PORT);
})