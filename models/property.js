// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var propertySchema = new Schema({
  name: {type: String, required: true},
  created_at: Date,
  updated_at: Date
});

// create a model using it
var Property = mongoose.model('Property', propertySchema);

// make this available to our properties in our Node applications
module.exports = Property;
