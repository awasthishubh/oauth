const rp = require('request-promise');
const authkeys = require('../config/keys').auth;

function instagram(app) {
  app.all('/instagram', (req, res) => {

    url = `https://www.instagram.com/oauth/authorize/?client_id=${authkeys.instagram.client_key}&redirect_uri=${authkeys.instagram.callback}&response_type=code`

    res.writeHead(303, {
      Location: url
    });
    res.end();
  })

  app.all('/instagram/callback', async (req, res) => {
    code = req.query.code;
    try {
      body = await rp.post({
        url: `https://api.instagram.com/oauth/access_token`,
        json: true,
        form: {
          client_id: authkeys.instagram.client_key,
          client_secret: authkeys.instagram.secrete_key,
          grant_type: 'authorization_code',
          redirect_uri: authkeys.instagram.callback,
          code
        }
      })

      // console.log(body);

      data = await require('./services/instagramdata').data(body.access_token)
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

module.exports.instagram = instagram
