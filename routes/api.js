var express = require('express');
var Property = require('../models/property');

module.exports = function(app){

  var router = express.Router();

  // create a property
  router.route('/property')
  .post(function(req, res) {
    var property = new Property();      // create a new instance of the Property model
    property.name = 'test' //req.body.name;  // set the property name (comes from the request)
    property.save(function(err) {
      if (err)
        res.status(500).send(err);
      else
        res.json({ message: 'Property created!' });
    });
  });

  // get a property
  router.route('/property/:id')
  .get(function(req, res) {
    Property.findById(req.params.id, function(err, property) {
      if (err)
        res.status(500).send(err);
      else if (property == null)
        res.status(404).send();
      else
        res.json( {data: property });
    });
  });

  // list properties
  router.route('/properties')
    .get(function(req, res){
      Property.find({}, function(err, properties) {
        res.json({data: properties});
      });
    });

  app.use('/api/1/', router);

}
