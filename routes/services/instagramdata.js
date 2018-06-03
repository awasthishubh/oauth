const request = require('request');

function basicdata(access_token) {
  return new Promise(function(resolve, reject) {
    request.get({
      url: `https://api.instagram.com/v1/users/self/?access_token=${access_token}`,
      json: true
    }, function(err, httpResponse, data) {
      if(!data) reject()
      else if(!(data.data)) reject()
      console.log(data)
      resolve(data.data.id)
    });
  })
}

module.exports.data = basicdata;
