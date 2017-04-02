var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateRate = new Schema({
  cityName: { type: String },
  cityValue: { type: String },
});

module.exports = mongoose.model('StateRate', StateRate);