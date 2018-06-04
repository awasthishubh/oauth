auth = {
  facebook: {
    client_key: process.env.facebook.client_key,
    secrete_key: process.env.facebook.secrete_key,
    callback: process.env.facebook.callback
  },
  google: {
    client_key: process.env.google.client_key,
    secrete_key: process.env.google.secrete_key,
    callback: process.env.google.callback
  },
  instagram: {
    client_key: process.env.instagram.client_key,
    secrete_key: process.env.instagram.secrete_key,
    callback: process.env.instagram.callback
  },
  twitter: {
    client_key: process.env.twitter.client_key,
    secrete_key: process.env.twitter.secrete_key,
    callback: process.env.twitter.callback
  },
  microsoft: {
    client_key: process.env.microsoft.client_key,
    secrete_key: process.env.microsoft.secrete_key,
    callback: process.env.microsoft.callback
  },
  dburl: process.env.dburl
}

if(process.env.NODE_ENV=="production") module.exports.auth = auth
else module.exports.auth=require('./local_keys').auth
