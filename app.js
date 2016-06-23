var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var User = require('./models/user.js');

var app = express();
var secrets = require('./config.js')("./config/secrets.json");
var config = require('./config.js')("./config/config.json");

// templating
app.set('view engine', 'ejs');

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongo and mongoose
mongoose.connect('mongodb://localhost/property-investment-calculator');

// cooksessions
if(!secrets.SESSION_SECRET)
  throw "Missing session secret from config";

app.use(session({
  secret: secrets.SESSION_SECRET,
  rolling: true,
  resave: true, 
  saveUninitialized: true,
  cookie: { maxAge: 300000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// nodemailer
if(!secrets.MAILGUN_API_KEY || !secrets.MAILGUN_DOMAIN)
  throw "Missing MAILGUN_API_KEY or MAILGUN_DOMAIN from config file";

var auth = {
  auth: {
    api_key: secrets.MAILGUN_API_KEY,
    domain: secrets.MAILGUN_DOMAIN
  }
}

var nodemailer = nodemailer.createTransport(mg(auth));

// static files
app.use(express.static('app/public'));
app.use('/node_modules', express.static('node_modules'));

// routing
app.get('/test', function (req, res) {
  res.render('pages/unit-tests');
});

// routes handled by angular2
var analyticsPolicy = ( config.ENV == "PRODUCTION" ) ? "auto" : "none";
var production = ( config.ENV == "PRODUCTION" );
app.get([
    '/', 
    '/calculator', 
    '/calculator/:opportunityId',
    '/reset-password/:token',
    '/boring-legal-mumbo-jumbo'
  ], function (req, res) {
  res.render('pages/index', { 
    analyticsPolicy: analyticsPolicy, 
    production: production 
  });
});

// api
require('./routes/api/opportunity.js')(app);
require('./routes/api/user.js')(app, nodemailer, secrets, config);

// very good, sir
var port = process.argv[2] || 3000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
