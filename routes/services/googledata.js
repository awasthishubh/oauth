const request = require('request');

function basicdata(access_token) {
  return new Promise(function(resolve, reject) {
    if(!access_token) reject()
    console.log(access_token);

    request.get({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      json: true,
      'auth': {
        'bearer': access_token
      }
    }, function(err, httpResponse, data) {
      if(!data) reject()
      console.log(data)
    });

    request.get({
      url: 'https://www.googleapis.com/plus/v1/people/me',
      json: true,
      'auth': {
        'bearer': access_token
      }
    }, function(err, httpResponse, data) {
      if(!data) reject()
      console.log(data)
      resolve(data.id)
    });
  });
}

module.exports.data = basicdata;
