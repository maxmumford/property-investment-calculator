var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// setup schema
var User = new Schema({
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// validation
User.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The email address is invalid or empty.');

// mongoose - use email for username
User.plugin(passportLocalMongoose, { 
  usernameField: 'email',
  usernameQueryFields: ['email']
});

User.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.hash;
  delete obj.salt;
  return obj;
}

module.exports = mongoose.model('User', User);
