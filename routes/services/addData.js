const mongoose = require('mongoose');
const oauth=mongoose.model('oauth')

function oauth_save(data,callback) {
  oauth.findOne({usid:data.usid}, function (err, docs) {
    if(err){
      console.log(err);
      callback()
    }
    else if(docs){
      docs.set({ photo: data.photo, token: data.token, raw_dat: data.raw_dat})
      docs.save()
      console.log(111111111111);
      callback(true)
    }
    else{
      new oauth(data).save()
      callback(false)
      console.log(111111111111);
    }
});
}

module.exports.oauth = oauth_save;
