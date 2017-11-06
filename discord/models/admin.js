var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
	id : Number
});

module.exports = mongoose.model('Admin', adminSchema);
