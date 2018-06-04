const express = require('express');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/oauth');

mongoose.connect(keys.auth.dburl)

const app = express();

app.use((req,res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('assets'))

require('./routes/google').google(app);
require('./routes/facebook').facebook(app);
require('./routes/microsoft').microsoft(app);
require('./routes/twitter').twitter(app);
require('./routes/instagram').instagram(app);
require('./routes/getData').getData(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/views/user.htm");
})


port=process.env.PORT || 3000
app.listen(port,()=>{
  console.log('\x1b[36m%s\x1b[0m',"Server started at port "+port);
})
