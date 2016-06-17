var express = require('express');
var passport = require('passport');
var isAuthenticated = require('../../middleware.js');

var Property = require('../../models/property');

module.exports = function(app){

  var router = express.Router();

  // create a property
  router.route('/property')
  .post( isAuthenticated, function(req, res) {
    delete req.body._id; // otherwise returned property._id === req.body._id
    var property = new Property();
    property = Object.assign(property, req.body);
    property.user = req.user;

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
  .put(isAuthenticated, function(req, res) {
    delete req.body._id;
    var id = req.params.id;
    Property.findOneAndUpdate({_id: req.params.id, user: req.user._id}, 
      { $set: req.body }, function (error, property) {
      if (error)
        res.status(500).send(error);
      else
        res.json({ message: 'Your property has been updated', data: property });
    });
  });

  // get a property
  router.route('/property/:id')
  .get(isAuthenticated, function(req, res) {
    Property.findOne({_id: req.params.id, user: req.user._id}, function(error, property) {
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
  .delete(isAuthenticated, function(req, res) {
    var propertyId = req.params.id;

    Property.findOneAndRemove({_id: req.params.id, user: req.user._id}, function (error,property){
      if (error)
        res.status(500).send(error);
      else
        res.json( {message: "Deleted", data: {id: req.params.id, _id: req.params.id} });
    });
  });

  // list properties
  router.route('/properties')
    .get(isAuthenticated, function(req, res){
      Property.find({user: req.user._id}, function(error, properties) {
        res.json({data: properties});
      });
    });

  app.use('/api/1/', router);

}
