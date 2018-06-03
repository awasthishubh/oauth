const rp = require('request-promise');

function basicdata(access_token) {
  return new Promise(async function(resolve, reject) {

    data= await rp.get({
      url: 'https://graph.facebook.com/me?access_token='+access_token+'&fields=id,name,email',
      json:true,
    })
    photo = await rp.get({
      url: 'https://graph.facebook.com/v3.0/me/picture?access_token='+access_token+'&format=json&redirect=false&type=large',
      json:true,
    })

    if(!data) reject()
    else if(!(data.id)) reject()
    console.log(data);
    resolve(data.id)


    console.log(photo);
  })
}

module.exports.data = basicdata;
