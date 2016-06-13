var express = require('express');
var app = express();

// setup app
app.set('view engine', 'ejs');

// static files
app.use(express.static('app/public'));
app.use('/node_modules', express.static('node_modules'));

// routing
app.get('/test', function (req, res) {
  res.render('pages/unit-tests');
});

app.get(['/', '/calculator'], function (req, res) {
  res.render('pages/index');
});

// let's go!
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
 