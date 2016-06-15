var express = require('express');
var Property = require('../models/property');

module.exports = function(app){

  var router = express.Router();

  // create a property
  router.route('/property')
  .post(function(req, res) {
    delete req.body._id; // otherwise returned property._id === req.body._id
    var property = new Property();
    property = Object.assign(property, req.body);

    property.save(function(error, property) {
      if (error)
        res.status(500).send(error);
      else{
        res.json({ message: 'Your property has been saved', data: property });
      }
    });
  });

  // update a property
  router.route('/property/:id')
  .put(function(req, res) {
    delete req.body._id;
    var id = req.params.id;
    Property.findByIdAndUpdate(id, { $set: req.body }, function (error, property) {
      if (error)
        res.status(500).send(error);
      else
        res.json({ message: 'Your property has been updated', data: property });
    });
  });

  // get a property
  router.route('/property/:id')
  .get(function(req, res) {
    Property.findById(req.params.id, function(error, property) {
      if (error)
        res.status(500).send(error);
      else if (property == null)
        res.status(404).send();
      else
        res.json( {data: property });
    });
  });

  // delete a property
  router.route('/property/:id')
  .delete(function(req, res) {
    var propertyId = req.params.id;

    Property.findByIdAndRemove(propertyId, function (error,property){
      if (error)
        res.status(500).send(error);
      else
        res.json( {message: "Deleted", data: {id: req.params.id, _id: req.params.id} });
    });
  });

  // list properties
  router.route('/properties')
    .get(function(req, res){
      Property.find({}, function(error, properties) {
        res.json({data: properties});
      });
    });

  app.use('/api/1/', router);

}
