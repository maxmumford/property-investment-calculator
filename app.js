var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user.js');

// setup app
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/property-investment-calculator');

app.use(session({
  secret: 'keyboard cat',
  rolling: true,
  resave: true, 
  saveUninitialized: true,
  cookie: { maxAge: 300000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static('app/public'));
app.use('/node_modules', express.static('node_modules'));

// routing
app.get('/test', function (req, res) {
  res.render('pages/unit-tests');
});

app.get(['/', '/calculator', '/calculator/:opportunityId'], function (req, res) {
  res.render('pages/index');
});

// api
require('./routes/api/opportunity.js')(app);
require('./routes/api/user.js')(app);

// let's go!
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
