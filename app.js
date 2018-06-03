const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use((req,res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/google').google(app);
require('./routes/facebook').facebook(app);
require('./routes/microsoft').microsoft(app);
require('./routes/twitter').twitter(app);
require('./routes/instagram').instagram(app);

app.get('/', (req, res) => {
  res.json({
    sucess: 1
  });
})

app.listen(3000,()=>{
  console.log("Server started at port 30000");
})
