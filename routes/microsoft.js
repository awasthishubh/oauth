const request = require('request');
const authkeys = require('../config/keys').auth;

function microsoft(app) {
  app.all('/microsoft', (req, res) => {

    url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize\
    ?client_id=${authkeys.microsoft.client_key}\
    &response_type=code\
    &scope=user.read\
    &redirect_uri=${authkeys.microsoft.callback}\
    &response_mode=query`

    res.writeHead(303, {
      Location: url
    });
    res.end();
  })

  app.all('/microsoft/callback', (req, res) => {
    code = req.query.code;
    request.get({
      url: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
      json: true,
      form: {
        grant_type: 'authorization_code',
        code,
        client_id: authkeys.microsoft.client_key,
        client_secret: authkeys.microsoft.secrete_key,
        redirect_uri: authkeys.microsoft.callback,
        scope: "user.read"
      }
    }, async (err, httpResponse, body) => {
      try {
        console.log(body);
        data = await require('./services/microsoftdata').data(body.access_token)
        return res.json({
          data
        })
      } catch (err) {
        return res.json({
          err: 'Invalid/Missing auth code'
        })
      }
    })
  })
}
module.exports.microsoft = microsoft
