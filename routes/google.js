function google(app) {
  app.all('/google', (req, res) => {
    code = req.query.access_token;
    console.log({code: xcxc});
    res.status(400).send({
      req: req.query,
      rex: req.body
    })

    // res.send()
    req.query.code
  })


  app.all('/google/callback', (req, res) => {
    const request = require('request');
    code = req.query.code;
    request.post({
      url: 'https://accounts.google.com/o/oauth2/token',
      json: true,
      form: {
        client_id: '73201051505-mfs62el5nlc5fetui691m251s0cqsf82.apps.googleusercontent.com',
        client_secret: 'g_p03SF1G8Pwyu_IURpDAbNO',
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/google/callback'
      }
    }, async function(err, httpResponse, body) {
      // res.send(body)
      try {
        data= await require('./services/googledata').data(body.access_token)
        console.log(data);

        return res.json({data})//
      } catch (err) {
        return res.json({
          err: 'Invalid/Missing auth code'
        })
      }
    })
    //
    // console.log("dfdfdfdf");
  })
}
module.exports.google = google
