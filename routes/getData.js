const mongoose = require('mongoose');
const oauth=mongoose.model('oauth');

function getData(app) {
  app.all('/getdata',(req,res)=>{
    usid=req.query.usid;
    oauth.findOne({usid},(err,data)=>{
      res.json({data})
    })
  })
}

module.exports.getData = getData;
