const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use((req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./routes/google').google(app);

app.get('/', (req, res) => {
  res.json({
    sucess: 1
  });
})

app.listen(3000)
