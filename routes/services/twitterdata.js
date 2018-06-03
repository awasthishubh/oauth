const authkeys = require('../../config/keys').auth;
const rp = require('request-promise');

function basicdata(query, verifier) {

  return new Promise(async function(resolve, reject) {
    query = JSON.parse('{"' + decodeURI(query.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')
    url = `https://api.twitter.com/1.1/users/show.json?oauth_token_secret=${query.oauth_token_secret}&user_id=${query.user_id}&screen_name=${query.screen_name}`,

      data = await rp.get({
        url,
        json: true,
        'oauth': {
          consumer_key: 'ijnIGW9JlgzBxXnoLHDZQ1Q6Y',
          consumer_secret: 'VLzIR6OBVOYum5Ji4bwgShW04YcNGLnkmayUEhXAhLLjPmCily'
        },
        headers: {
          'oauth_verifier': verifier,
          'content-type': 'application/x-www-form-urlencoded'
        }

      })
    console.log(data);

    details={
      usid: data.id_str,
      name: data.name,
      username: data.screen_name,
      email: null,
      photo: data.profile_image_url.slice(0,-11)+data.profile_image_url.slice(-4),
      provider: 'Twitter',
      token: {query,verifier},
      raw_dat: {data}
    }
    console.log(details);

    resolve(data.id_str)
  });
}

module.exports.data = basicdata;
