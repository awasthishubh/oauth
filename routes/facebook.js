const rp = require('request-promise');
const authkeys = require('../config/keys').auth;

function facebook(app) {
  app.all('/facebook', (req, res) => {

    url=`https://www.facebook.com/v3.0/dialog/oauth?client_id=${authkeys.facebook.client_key}&redirect_uri=${authkeys.facebook.callback}&response_type=code&scope=email`

    res.writeHead(303,
      {Location: url}
    );
    res.end();
  })

  app.all('/facebook/callback', async (req, res) => {
    code=req.query.code;
    try{
      body= await rp.get({
        url:`https://graph.facebook.com/v2.10/oauth/access_token?client_id=${authkeys.facebook.client_key}&redirect_uri=${authkeys.facebook.callback}&client_secret=${authkeys.facebook.secrete_key}&code=${code}`,
        json:true
      })

      console.log(body);

      data= await require('./services/facebookdata').data(body.access_token)
      res.cookie('usid', data.id)
      res.cookie('existed', data.existed)
      return res.send(`<script>
        try{
          window.opener.location.reload();
          window.close();
        } catch(e){
          window.close();
        }
        </script>`)

    } catch (err) {
      console.log(err);
      return res.json({
        err: 'Invalid/Missing auth code'
      })
    }
  })


    // console.log(access_token);
    // data= await require('./services/facebookdata').data(access_token)
    // return res.json({data})
  //   const request = require('request');
  //   code = req.query.code;
  //   request.post({
  //     url: 'https://accounts.google.com/o/oauth2/token',
  //     json: true,
  //     form: {
  //       client_id: '73201051505-mfs62el5nlc5fetui691m251s0cqsf82.apps.googleusercontent.com',
  //       client_secret: 'g_p03SF1G8Pwyu_IURpDAbNO',
  //       grant_type: 'authorization_code',
  //       code,
  //       redirect_uri: 'http://localhost:3000/google/callback'
  //     }
  //   }, async function(err, httpResponse, body) {
  //     // res.send(body)
  //     try {
  //       data= await require('./services/googledata').data(body.access_token)
  //       console.log(data);
  //
  //       return res.json({data})//
  //     } catch (err) {
  //       return res.json({
  //         err: 'Invalid/Missing auth code'
  //       })
  //     }
  //   })
    //
    // console.log("dfdfdfdf");
  // })
}
module.exports.facebook = facebook
