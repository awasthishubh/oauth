const rp = require('request-promise');
const addData = require('./addData').oauth;

function basicdata(access_token) {
  return new Promise(async function(resolve, reject) {

    data=await rp.get({
      url: `https://api.instagram.com/v1/users/self/?access_token=${access_token}`,
      json: true
    })
      if(!data) reject()
      else if(!(data.data)) reject()
      data.data.profile_picture=data.data.profile_picture.replace("vp/", "");
      data.data.profile_picture=data.data.profile_picture.replace("s150x150", "s640x640");
      // console.log(data)
      details={
        usid: data.data.id,
        name: data.data.full_name,
        username: data.data.username,
        email: null,
        photo: data.data.profile_picture,
        provider: 'Instagram',
        token: {access_token},
        raw_dat: {data}
      }
      addData(details, function(existed) {
        console.log(existed);
        resolve({id:data.data.id, existed})
      })
      console.log(details);
    });
}

module.exports.data = basicdata;
