require('./config/config');

const express = require('express')
const app = express()

const  bodyParser = require('body-parser')
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario'))

//connect bd
  mongoose.connect('mongodb://127.0.0.1:27017/cafe', (err , res)=>{
  if ( err) throw err;
  console.log('base de datos online');

  });
app.listen(process.env.PORT, () => {
    console.log('conectado al puerto : ', process.env.PORT);
})