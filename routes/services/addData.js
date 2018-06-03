const mongoose = require('mongoose');
const oauth=mongoose.model('oauth')

function oauth_save(data) {
  // data={name:"shubham90", email:"345", photo:"xxav", token:{sd:'d'}}
  oauth.findOne({name:data.name}, function (err, docs) {
    if(err){
      console.log(err);
      return
    }
    else if(docs){
      docs.set({ photo: data.photo, token: data.token, raw_dat: data.raw_dat})
      docs.save()
      return true;
    }
    else{
      new oauth(data).save()
      return false;
    }
});
}

module.exports.oauth = oauth_save;
