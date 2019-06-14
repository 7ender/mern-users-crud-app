const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('users', userSchema);
