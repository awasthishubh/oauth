const express = require('express');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/oauth');

mongoose.connect(keys.dburl)

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
  console.log('\x1b[36m%s\x1b[0m',"Server started at port 30000");
})
