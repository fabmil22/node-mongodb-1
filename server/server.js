const express = require('express')
const app = express()
const  bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/usuario/', function (req, res) {
  res.json('getusuario')
})
 
app.post('/usuario/', function (req, res) {
    let  body = req.body
    res.json({body})
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
   
app.listen(3000 , () => {
    console.log('conectado al puerto : 3000');
})