const authkeys = require('../../config/keys').auth;
const request = require('request');

function basicdata(query) {

  return new Promise(function(resolve, reject) {
  query=JSON.parse('{"' + decodeURI(query.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
  url=`https://api.twitter.com/1.1/users/show.json?oauth_token_secret=${query.oauth_token_secret}&user_id=${query.user_id}&screen_name=${query.screen_name}`,

    request.get({
      url,
      json: true,
      'oauth': {
        consumer_key: 'ijnIGW9JlgzBxXnoLHDZQ1Q6Y',
        consumer_secret: 'VLzIR6OBVOYum5Ji4bwgShW04YcNGLnkmayUEhXAhLLjPmCily'
    },
    headers:{
      'oauth_verifier': 'g4SIcBufJEFEg27PiHnna14OWvjhHpnK',
      'content-type':'application/x-www-form-urlencoded'
    }

    }, function(err, httpResponse, data) {
      resolve(data.id_str)
    });
  })
}

module.exports.data = basicdata;