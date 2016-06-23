var express = require('express');
var passport = require('passport');
var isAuthenticated = require('../../middleware.js');

var Opportunity = require('../../models/opportunity');

module.exports = function(app){

  var router = express.Router();

  // create an opportunity
  router.route('/opportunity')
  .post( isAuthenticated, function(req, res) {
    delete req.body._id; // otherwise returned opportunity._id === req.body._id
    var opportunity = new Opportunity();
    opportunity = Object.assign(opportunity, req.body);
    opportunity.user = req.user;

    opportunity.save(function(error, opportunity) {
      if (error)
        res.status(500).send(error);
      else{
        res.json({ message: 'Your opportunity has been saved', data: opportunity });
      }
    });
  });

  // update an opportunity
  router.route('/opportunity/:id')
  .put(isAuthenticated, function(req, res) {
    delete req.body._id;
    var id = req.params.id;
    Opportunity.findOneAndUpdate({_id: req.params.id, user: req.user._id}, 
      { $set: req.body }, function (error, opportunity) {
      if (error)
        res.status(500).send(error);
      else if(opportunity == null)
        res.status(404).send();
      else
        res.json({ message: 'Your opportunity has been updated', data: opportunity });
    });
  });

  // update an opportunity
  router.route('/opportunity/:id/make-public')
  .get(isAuthenticated, function(req, res) {
    var id = req.params.id;
    Opportunity.findOneAndUpdate({_id: req.params.id, user: req.user._id}, 
      { $set: {isPublic: true} }, function (error, opportunity) {
      if (error)
        res.status(500).send(error);
      else if(opportunity == null)
        res.status(404).send();
      else
        res.json({ message: 'Your opportunity has been set to public', data: opportunity });
    });
  });

  // get an opportunity
  router.route('/opportunity/:id')
  .get(function(req, res) {
    Opportunity.findOne({_id: req.params.id}, function(error, opportunity){
      if(error)
        res.status(500).send(error);
      else if (opportunity == null)
        res.status(404).send();
      else {
        // if public, return it
        if(opportunity.isPublic)
          res.status(200).json({data: opportunity});  
        // otherwise if owner, return it
        else if(req.user && opportunity.user.equals(req.user._id))
          res.status(200).json({data: opportunity});
        // otherwise deny access
        else
          res.status(403).json({ "error": "Access denied", "message": "Either you are not the owner or the opportunity is not set to public" });
      }
    });
  });

  // delete an opportunity
  router.route('/opportunity/:id')
  .delete(isAuthenticated, function(req, res) {
    var opportunityId = req.params.id;

    Opportunity.findOneAndRemove({_id: req.params.id, user: req.user._id}, function (error,opportunity){
      if (error)
        res.status(500).send(error);
      else
        res.json( {message: "Deleted", data: {id: req.params.id, _id: req.params.id} });
    });
  });

  // list opportunities
  router.route('/opportunities')
    .get(isAuthenticated, function(req, res){
      Opportunity.find({user: req.user._id}, function(error, opportunities) {
        res.json({data: opportunities});
      });
    });

  app.use('/api/1/', router);

}
