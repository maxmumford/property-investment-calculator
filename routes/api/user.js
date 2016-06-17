var express = require('express');
var session = require('express-session')
var passport = require('passport');

var User = require('../../models/user');

module.exports = function(app){

  // router for user routes
  var router = express.Router();

  // sign up
  router.post('/user', function(req, res) {
    User.register(new User({ email: req.body.email }),
      req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          err: err
        });
      }
      passport.authenticate('local')(req, res, function () {
        // registration successful, log them in
        req.logIn(user, function(err){
          if (err) {
            return res.status(500).json({
              err: 'User created but could not log in'
            });
          }
        });

        // return feedback
        return res.status(200).json({
          status: 'Sign up successful and user logged in',
          user: {email: user.email}
        });
      });
    });
  });

  // login
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          err: info
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).json({
            err: 'Could not log in user'
          });
        }
        // login successful so save email to the session
        req.session.user = user;

        // and return a success message
        res.status(200).json({
          status: 'Login successful!',
          user: {email: user.email}
        });
      });
    })(req, res, next);
  });

  // logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Good byeb!'
    });
  });

  // get current user
  router.get('/user', function(req, res) {
    if(req.session.user)
      res.status(200).json({user: req.user});
    else
      res.status(404).json({user: null, message: "Not logged in"});
  });

  app.use('/api/1/', router);

}
