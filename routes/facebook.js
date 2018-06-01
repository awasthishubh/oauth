function facebook(app) {
  app.all('/facebook', (req, res) => {
    code = req.query.code;
    req
    res.status(400).send({
      req: req.query,
      rex: req.body
    })

    // res.send()
    req.query.code
  })

https://graph.facebook.com/v2.10/oauth/access_token?client_id=1955990028046787&redirect_uri=https://acm-reachout.herokuapp.com/&client_secret=fb88747368f6ffed594d892325e09e25&code=AQBMm2qq-6TDMOaXlwJmUW2lybgAHcb0NmG0cGv6ssNBuS4cFvq0jlS6KvTj050KHYakEQzbam7GDqX4XEWihzq8FhqfDzHAY0y08Ie4NXgRxauIuk3kvsJhhQBrmmL3hr6878-xkXVLTzSGC8QrkT2BUWFFsXgMtti3WOWcyFSNyrCEskEPGw27GtnUw2vavrxht1j7tyqLQtELViSGe_SIlwxPQLYE5HnCzvewOl8Yz8YSl8p7C7r1da39j5z_btgYc_A1qEmT0o6Q1TAGJOuUe7YoodBktHaX0_1s_M0bgkEOFs3Uq9aeX0fGlp0wDT15VIMeHNl0xvNK8foNgJcZ#_=_
  app.all('/facebook/callback', (req, res) => {
    code=req.query.code;
    const request = require('request');
    request.get({
      url:`https://graph.facebook.com/v2.10/oauth/access_token?client_id=1955990028046787&redirect_uri=https://acm-reachout.herokuapp.com/&client_secret=fb88747368f6ffed594d892325e09e25&code=${code}`,
      json:true
    }, async (err, httpResponse, body)=>{
      console.log(body);
      data= await require('./services/facebookdata').data(body.access_token)
      return res.json({data})
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
  })
}
module.exports.facebook = facebook
