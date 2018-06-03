const rp = require('request-promise');

function basicdata(access_token) {
  return new Promise(async function(resolve, reject) {

    data=await rp.get({
      url: `https://api.instagram.com/v1/users/self/?access_token=${access_token}`,
      json: true
    })
      if(!data) reject()
      else if(!(data.data)) reject()
      // console.log(data)
      details={
        usid: data.data.id,
        name: data.data.full_name,
        username: data.data.username,
        email: null,
        photo: data.data.profile_picture,
        provider: 'Instagram',
        token: access_token,
        raw_dat: {data}
      }
      console.log(details);

      resolve(data.data.id)
    });
}

module.exports.data = basicdata;
