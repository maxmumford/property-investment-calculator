var express = require('express');
var passport = require('passport');
var isAuthenticated = require('../../middleware.js');

var Opportunity = require('../../models/opportunity');

module.exports = function(app){

  var router = express.Router();

  // create a opportunity
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

  // update a opportunity
  router.route('/opportunity/:id')
  .put(isAuthenticated, function(req, res) {
    delete req.body._id;
    var id = req.params.id;
    Opportunity.findOneAndUpdate({_id: req.params.id, user: req.user._id}, 
      { $set: req.body }, function (error, opportunity) {
      if (error)
        res.status(500).send(error);
      else
        res.json({ message: 'Your opportunity has been updated', data: opportunity });
    });
  });

  // get a opportunity
  router.route('/opportunity/:id')
  .get(isAuthenticated, function(req, res) {
    Opportunity.findOne({_id: req.params.id, user: req.user._id}, function(error, opportunity) {
      if (error)
        res.status(500).send(error);
      else if (opportunity == null)
        res.status(404).send();
      else
        res.json( {data: opportunity });
    });
  });

  // delete a opportunity
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
