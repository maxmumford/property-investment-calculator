var express = require('express');
var app = express();
var mongoose = require('mongoose');

// setup app
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/property-investment-calculator');

// static files
app.use(express.static('app/public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/bower_components', express.static('bower_components'));

// routing
app.get('/test', function (req, res) {
  res.render('pages/unit-tests');
});

app.get(['/', '/calculator', '/calculator/:propertyId'], function (req, res) {
  res.render('pages/index');
});

// api
require('./routes/api.js')(app);

// let's go!
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
