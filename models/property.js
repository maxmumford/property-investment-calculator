// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user.js");

// create a schema
var propertySchema = new Schema({
  user:                 {type: Schema.ObjectId, ref: "User", reqired: true},
  name:                 {type: String, required: true},
  calculatorAdvanced:   {type: Boolean},

  // tenant
  tenantNumber:         {type: Number},
  rentPerTenantWeekly:  {type: Number},

  // expenses
  billsYearly:          {type: Number},
  voids:                {type: Number},
  management:           {type: Number},
  maintenanceYearly:    {type: Number},

  // property
  purchasePrice:        {type: Number},
  refurbCost:           {type: Number},
  legalFees:            {type: Number},
  stampDuty:            {type: Number},

  // mortgage
  paymentBasis:         {type: String},
  mortgageType:         {type: String},
  valuationBuyToLet:    {type: Number},
  multiplier:           {type: Number},
  pullOutExtraMoney:    {type: Boolean},
  loanToValue:          {type: Number},
  apr:                  {type: Number},
  term:                 {type: Number},

  // meta
  created_at:           {type: Date},
  updated_at:           {type: Date}
});

// create a model using it
var Property = mongoose.model('Property', propertySchema);

// make this available to our properties in our Node applications
module.exports = Property;
