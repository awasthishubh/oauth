const request = require('request');
const authkeys = require('../config/keys').auth;

function instagram(app) {
  app.all('/instagram', (req, res) => {

    // url=`https://www.instagram.com/v3.0/dialog/oauth?client_id=${authkeys.instagram.client_key}&redirect_uri=${authkeys.instagram.callback}&response_type=code&scope=email`
    url=`https://www.instagram.com/oauth/authorize/?client_id=${authkeys.instagram.client_key}&redirect_uri=${authkeys.instagram.callback}&response_type=code`

    res.writeHead(303,
      {Location: url}
    );
    res.end();
  })

  app.all('/instagram/callback', (req, res) => {
    code=req.query.code;
    const request = require('request');
    request.post({
      url:`https://api.instagram.com/oauth/access_token`,
      json:true,
      form:{
        client_id: authkeys.instagram.client_key,
        client_secret:authkeys.instagram.secrete_key,
        grant_type:'authorization_code',
        redirect_uri:authkeys.instagram.callback,
        code
      }
    }, async (err, httpResponse, body)=>{
      console.log(body);
      try{
        data= await require('./services/instagramdata').data(body.access_token)
        return res.json({data})
      } catch (err) {
        return res.json({
          err: 'Invalid/Missing auth code'
        })
      }
    })
  })
}

module.exports.instagram = instagram
