const rp = require('request-promise');
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

  app.all('/microsoft/callback', async (req, res) => {
    code = req.query.code;
    try {
      body= await rp.get({
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
      })
      console.log(body);
      data = await require('./services/microsoftdata').data(body.access_token)
      res.cookie('usid', data.id)
      res.cookie('existed', data.existed)
      return res.json(data)
    } catch (err) {
      console.log(err);
      return res.json({
        err: 'Invalid/Missing auth code'
      })
    }
  })
}
module.exports.microsoft = microsoft
