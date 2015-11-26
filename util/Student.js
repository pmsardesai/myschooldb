import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let studentSchema = new Schema({
    firstname: String,
 	lastname: String,
 	othernames: String,
 	alias: String,
    year: Number
});

module.exports = mongoose.model('Student', studentSchema);