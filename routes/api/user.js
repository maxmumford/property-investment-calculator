var express = require('express');
var passport = require('passport');
var crypto = require('crypto');
var async = require('async');

var User = require('../../models/user');

module.exports = function(app, nodemailer, secrets, config){

  // router for user routes
  var router = express.Router();

  // sign up
  router.post('/user', function(req, res) {
    User.register(new User({ email: req.body.email }),
      req.body.password, function(err, user) {
      if (err) {
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
    if(req.user)
      res.status(200).json({user: req.user});
    else
      res.status(200).json({user: null, message: "Not logged in"});
  });

  // forgot password
  router.post('/user/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          // handle user not found
          if (!user) {
            res.status(404).json({ error: "UserNotFound", message: "Could not find a user with that email address" });
            return;
          }

          // update user
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // valid for 1 hour

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        // send email with token
        nodemailer.sendMail({
          from: secrets.MAILGUN_NOREPLY,
          to: user.email,
          subject: 'Reset Your Password for PropertyInvestmentCalculator.com',
          'h:Reply-To': secrets.MAILGUN_NOREPLY,
          //html: '<b>Wow Big powerful letters</b> testing mailgun transport',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account on PropertyInvestmentCalculator.com\n\n' +
            'Please click on the following link, or paste it into your browser:\n\n' +
            config.BASE_URL + '/reset-password/' + token + '\n\n' +
            'If you did not want to reset your password you can safely ignore this email and it will remain unchanged.\n'
        }, function (err, info) {
          if (err) {
            res.status(500).json({ error: "MailgunError", message: "Error sending password reset email", mailgun: err })
            return;
          }
          else {
            done(info);
          }
        });
      }
    ], function(mailgunResponse) {
      res.json({ message: "Password reset email sent", mailgun: mailgunResponse });
    });
  });

  // reset password
  router.post('/user/forgot/:token', function(req, res) {
    async.waterfall([
      // check token
      function(done) {
        User.findOne({ 
          resetPasswordToken: req.params.token, 
          resetPasswordExpires: { $gt: Date.now() } 
        }, function(err, user) {
          // handle invalid token
          if (!user) {
            res.status(403).json({ 
              error: 'InvalidToken', 
              message: 'Password reset token is invalid or has expired' 
            });
            return;
          }
          // token valid
          done(err, user);
        });
      },
      // update user if new password is supplied
      function(user, done){
        if(!req.body.password){
          res.send({ message: "Token is valid" });
          return;
        }

        // update password, reset token fields
        user.setPassword(req.body.password, function(err, user) {
          if(err)
            return res.status(500).json({message:"SetPasswordError", error: err});

          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          // save the user
          user.save(function(err) {
            if(err)
              return res.status(500).json({message:"UserUpdateError", error: err});
            // log the user in
            req.logIn(user, function(err) {
              if(err)
                return res.status(500).json({message:"UserUpdateError", error: err});
              done(err, user);
            });
          });
        });
      },
      // send "password changed" email
      function(user, done) {
        nodemailer.sendMail({
          from: secrets.MAILGUN_NOREPLY,
          to: user.email,
          subject: 'Password Changed for PropertyInvestmentCalculator.com',
          'h:Reply-To': secrets.MAILGUN_NOREPLY,
          text: "Just a quick confirmation email to let you know that the password on your PropertyInvestmentCalculator.com account has been changed."
            + " If this wasn't you, please get in touch with the link below:\n\nhttps://www.cocept.io/contact"
        }, function (err, info) {
          if (err) {
            res.status(500).json({ 
              error: "MailgunError", 
              message: "Error sending password reset email", 
              mailgun: err 
            });
            return;
          }
          else {
            res.json({ message: "Your password has been changed and you have been logged in", user: user })
          }
        });
      }
    ]);
  });

  app.use('/api/1/', router);

}
