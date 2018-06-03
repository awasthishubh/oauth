const request = require('request');

function basicdata(access_token) {
  return new Promise(function(resolve, reject) {
    console.log('adsdsdsdsdsd');
    request.get({
      url: 'https://graph.facebook.com/me?access_token='+access_token+'&fields=id,name,email',
      json:true,
    }, function(err, httpResponse, data) {
      if(!data) reject()
      else if(!(data.id)) reject()
      console.log(data);
      resolve(data.id)
    })

    request.get({
      url: 'https://graph.facebook.com/v3.0/me/picture?access_token='+access_token+'&format=json&redirect=false&type=large',
      json:true,
    }, function(err, httpResponse, data) {
      console.log(data);
    })
  })
}

module.exports.data = basicdata;
