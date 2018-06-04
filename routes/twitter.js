const rp = require('request-promise');
const authkeys = require('../config/keys').auth;

function twitter(app) {
  app.all('/twitter', async (req, res) => {
    body = await rp.post({
      url: 'https://api.twitter.com/oauth/request_token',
      json: true,
      'oauth': {
        callback: authkeys.twitter.callback,
        consumer_key: authkeys.twitter.client_key,
        consumer_secret: authkeys.twitter.secrete_key
      }
    })
    res.writeHead(303, {
      Location: 'https://api.twitter.com/oauth/authenticate?' + body
    });
    res.end();
  })


  app.all('/twitter/callback', async (req, res) => {
    console.log(req.query);
    body = await rp.post({
      url: 'https://api.twitter.com/oauth/access_token',
      json: true,
      'oauth': {
        consumer_key: authkeys.twitter.client_key,
        consumer_secret: authkeys.twitter.secrete_key,
        verifier: req.query.oauth_verifier,
        token: req.query.oauth_token,
      }
    })
    try {
      console.log(body);
      data = await require('./services/twitterdata').data(body,req.query.oauth_verifier)
      res.cookie('usid', data.id)
      res.cookie('existed', data.existed)
      return res.send(`<script>
        window.onunload = refreshParent;
        function refreshParent() {
            window.opener.location.reload();
        }
        window.close();
    </script>`)

    } catch (err) {
      console.log(err);
      return res.json({
        err: 'Invalid/Missing auth code'
      })
    }

  })

}


module.exports.twitter = twitter
