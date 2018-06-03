const request = require('request');

function basicdata(access_token) {
  return new Promise(function(resolve, reject) {
    request.get({
      url: 'https://graph.microsoft.com/v1.0/me',
      json: true,
      'auth': {
        'bearer': access_token
      }
    }, function(err, httpResponse, data) {
      if(!data) reject()
      else if(!(data.id)) reject()
      console.log(data)
      resolve(data.id)
    });
  })
}

module.exports.data = basicdata;
