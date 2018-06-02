const request = require('request');
const authkeys = require('../config/keys').auth;

function microsoft(app) {
  app.all('/microsoft', (req, res) => {
    code = req.query.code;
    req
    res.status(400).send({
      req: req.query,
      rex: req.body
    })

    // res.send()
    req.query.code
  })

  app.all('/microsoft/callback', (req, res) => {
    code=req.query.code;
    request.get({
      url:`https://login.microsoftonline.com/common/oauth2/v2.0/token`,
      json:true,
      form: {
        grant_type: 'authorization_code',
        code,
        client_id: authkeys.microsoft.client_key,
        client_secret: authkeys.microsoft.secrete_key,
        redirect_uri: "http://localhost:3000/microsoft/callback",
        scope: "user.read"
      }
    }, async (err, httpResponse, body)=>{
      console.log(body);
      data= await require('./services/microsoftdata').data(body.access_token)
      return res.json({data})
    })

  })
}
module.exports.microsoft = microsoft
