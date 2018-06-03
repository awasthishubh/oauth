const rp = require('request-promise');

function basicdata(access_token) {
  return new Promise(async function(resolve, reject) {
    data= await rp.get({
      url: 'https://graph.microsoft.com/v1.0/me',
      json: true,
      'auth': {
        'bearer': access_token
      }
    })
      if(!data) reject('data error')
      else if(!(data.id)) reject('id error')
      console.log({data})
      resolve(data.id)
    });
}

module.exports.data = basicdata;
