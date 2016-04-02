var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  locationKey: {type: String, unique: true},
  wheat: Array,
  barley: Array,
  cty: {type: String, unique: true},
  twp: {type: String, index: true, unique: true, sparse: true},
  rge: {type: String, unique: true},
});

var twpSet = new Set();

LocationSchema.methods.twp1 = function () {
    var curTwp = this.twp;

    if (twpSet.has(curTwp)) {
        this.twp = undefined; // remove the twp field once duplicated
    } else {
        twpSet.add(curTwp); // save the existing twp value
    }
};

LocationSchema.queue('twp1');

module.exports = mongoose.model('Location', LocationSchema);