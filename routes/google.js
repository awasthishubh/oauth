function google(app) {
  app.all('/google', (req, res) => {

    res.status(400).send({
      req: req.query,
      rex: req.body
    })

    // res.send()
    req.query.code
  })
}

module.exports.google = google
