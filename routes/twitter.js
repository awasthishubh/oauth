const request = require('request');
const authkeys = require('../config/keys').auth;

function twitter(app) {
  app.all('/twitter', (req,res)=>{
    request.post({
      url:'https://api.twitter.com/oauth/request_token',
      json: true,
      'oauth': {
        // callback: 'http://localhost:3000/twitter',
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


}
module.exports.twitter = twitter
