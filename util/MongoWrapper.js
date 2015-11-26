var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

/*
* Wrapper class to insert, delete or modify data in the database.
*/
module.exports = {
	// To start mongo db locally, type c:\mongodb\bin\mongod in cmd line

	/*
	* Insert's student data into the database
	*/
	insertStudentInfo: function (mongoDb, data) {
		console.log('[Start] insertStudentInfo');

		var Student = this._createStudenSchema();

		// Add student data to database
		for	(var i = 0; i < data.length; i++) {
		    var student = data[i];
		    var year = student[0];
		    var last = student[1];
		    var first = student[2];
		    var middle = student[3];
		    var alias = student[4];

		    var studentModel = 
		    	this._createStudent(Student, first, last, middle, year, alias);

		    studentModel.save()
		}

		console.log('[End] insertStudentInfo');
	},



	/*
	* Creates and returns the student schema.
	*/
	_createStudenSchema: function() {
		var Schema = mongoose.Schema;

		var studentSchema = new Schema({
		    first: String,
		 	last: String,
		 	middle: String,
		 	alias: String,
		    year: Number
		});

		return  mongoose.model('Student', studentSchema);
	},

	_createStudent: function(Student, first, last, middle, year, alias) {
		return new Student({
			first: first,
			last: last,
			middle: middle,
			alias: alias,
			year: year
		});
	}
}