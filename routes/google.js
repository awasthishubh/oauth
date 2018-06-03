const request = require('request');
const authkeys = require('../config/keys').auth;

function google(app) {
  app.all('/google', (req, res) => {

    url=`https://accounts.google.com/o/oauth2/auth?redirect_uri=${authkeys.google.callback}&response_type=code&scope=https://www.googleapis.com/auth/analytics.readonly+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/plus.login&client_id=${authkeys.google.client_key}`

    res.writeHead(303,
      {Location: url}
    );
    res.end();
  })

  app.all('/google/callback', (req, res) => {
    code = req.query.code;
    request.post({
      url: 'https://accounts.google.com/o/oauth2/token',
      json: true,
      form: {
        client_id: authkeys.google.client_key,
        client_secret: authkeys.google.secrete_key,
        grant_type: 'authorization_code',
        code,
        redirect_uri: authkeys.google.callback
      }
    }, async function(err, httpResponse, body) {
      try {
        data= await require('./services/googledata').data(body.access_token)
        console.log(data);
        return res.json({data})
      } catch (err) {
        return res.json({
          err: 'Invalid/Missing auth code'
        })
      }
    })
  })
}
module.exports.google = google
