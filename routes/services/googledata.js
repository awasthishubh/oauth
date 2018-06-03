const rp = require('request-promise');
const addData = require('./addData').oauth;

function basicdata(access_token) {
  return new Promise(async function(resolve, reject) {
    if (!access_token) return reject()
    console.log(access_token);

    try {

      data = await rp.get({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        json: true,
        'auth': {
          'bearer': access_token
        }
      })

      plus = await rp.get({
        url: 'https://www.googleapis.com/plus/v1/people/me',
        json: true,
        'auth': {
          'bearer': access_token
        }
      })

      if (!data) reject('data na')
      else if (!(data.id)) reject('id na')
      details={
        usid: data.id,
        name: data.name,
        email: data.email,
        photo: data.picture,
        provider: 'Google',
        token: {access_token},
        raw_dat: {data, plus}
      }
      addData(details, function(existed) {
        console.log(existed);
        resolve({id:data.id, existed})
      })

      // console.log(details);

    } catch (e) {
      reject(e)
    }
  });
}

module.exports.data = basicdata;
