const request = require('request');
const authkeys = require('../config/keys').auth;

function twitter(app) {
  app.all('/twitter', (req,res)=>{
    request.post({
      url:'https://api.twitter.com/oauth/request_token',
      json: true,
      'oauth': {
        callback: authkeys.twitter.callback,
        consumer_key: authkeys.twitter.client_key,
        consumer_secret: authkeys.twitter.secrete_key
    }
    }, function(err, response, body) {
      console.log(body)
      res.writeHead(303,
        {Location: 'https://api.twitter.com/oauth/authenticate?'+body}
      );
      res.end();
    })
  })

  app.all('/twitter/callback', (req, res)=>{
    console.log(req.query);
    request.post({
      url:'https://api.twitter.com/oauth/access_token',
      json: true,
      'oauth': {
        consumer_key: authkeys.twitter.client_key,
        consumer_secret: authkeys.twitter.secrete_key,
        verifier: req.query.oauth_verifier,
        token: req.query.oauth_token,
    }
  }, async function(err, response, body) {
      console.log(body)
      try {
        console.log(body);
        data = await require('./services/twitterdata').data(body)
        return res.json({
          data
        })
      } catch (err) {
        console.log(err);
        return res.json({
          err: 'Invalid/Missing auth code'
        })
      }

    })
  })

}


module.exports.twitter = twitter
