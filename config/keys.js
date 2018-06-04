auth = {
  facebook: {
    client_key: process.env.facebook_client_key,
    secrete_key: process.env.facebook_secrete_key,
    callback: process.env.facebook_callback
  },
  google: {
    client_key: process.env.google_client_key,
    secrete_key: process.env.google_secrete_key,
    callback: process.env.google_callback
  },
  instagram: {
    client_key: process.env.instagram_client_key,
    secrete_key: process.env.instagram_secrete_key,
    callback: process.env.instagram_callback
  },
  twitter: {
    client_key: process.env.twitter_client_key,
    secrete_key: process.env.twitter_secrete_key,
    callback: process.env.twitter_callback
  },
  microsoft: {
    client_key: process.env.microsoft_client_key,
    secrete_key: process.env.microsoft_secrete_key,
    callback: process.env.microsoft_callback
  },
  dburl: process.env.dburl
}

if(process.env.NODE_ENV=="production") module.exports.auth = auth
else module.exports.auth=require('./local_keys').auth
