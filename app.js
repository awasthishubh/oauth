const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('./routes/google').google(app);

app.get('/', (req, res) => {
  res.json({
    sucess: 1
  });
})

app.listen(3000)
