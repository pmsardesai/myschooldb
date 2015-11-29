var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var studentSchema = new Schema({
    first: String,
 	last: String,
 	middle: String,
 	alias: String,
    year: String,
    isPhoto: Boolean
});

module.exports = mongoose.model('Student', studentSchema);   