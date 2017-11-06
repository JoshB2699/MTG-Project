var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
	name : String,
	manaCost : String,
	cmc : Number,
	type : String,
	text : String,
	power : Number,
	toughness : Number,
	loyalty : Number,
	types : [],
	printings : []
}, {strict : false});

module.exports = mongoose.model('Card', cardSchema);
