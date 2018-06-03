const mongoose = require('mongoose');
const {Schema} = mongoose;

const oauthSchema = new Schema({
  usid: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  username: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  photo: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    default: null
  },
  token: {
    type: Object,
    default: {}
  },
  raw_dat: {
    type: Object,
    default: {}
  }
},{ minimize: false })

mongoose.model('oauth', oauthSchema);
