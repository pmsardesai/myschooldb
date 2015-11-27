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
	insertStudentInfo: function (mongoDB, data) {
		console.log('[Start] insertStudentInfo');

		var Student = this._createStudentSchema();

		// Add student data to database
		for	(var i = 1; i < data.length; i++) {
		    var record = data[i];
		    var year = record[0];
		    var last = record[1];
		    var first = record[2];
		    var middle = record[3];
		    var alias = record[4];

		    var student = 
		    	this._createStudent(Student, first, last, middle, year, alias);

		    student.save()
		}
		console.log('[End] insertStudentInfo');
	},

	/*
	* Removes collection.
	*/
	dropDb: function(mongoDB) {
		mongoDB.db.dropDatabase(); // clear database
	},

	/*
	* Creates and returns the student schema.
	*/
	_createStudentSchema: function() {
		var studentSchema = {
		    first: String,
		 	last: String,
		 	middle: String,
		 	alias: String,
		    year: String
		};

		return  mongoose.model('Student', studentSchema);
	},

	/*
	* Creates and return student object.
	*/
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