var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopHalf = new Schema({
  basicKey: { type: String },
  half_two: { type: String },
  half_two_plus: { type: String }
});

module.exports = mongoose.model('TopHalf', TopHalf);