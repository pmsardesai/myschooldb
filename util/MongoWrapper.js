var deferred = require("deferred"),
	mongoose = require("mongoose"),
	Student = require("./StudentModel"),
	YearInfo = require("./YearInfo");

/*
* Wrapper class to insert, delete or modify data in the database.
*/
module.exports = {
	// To start mongo db locally, type c:\mongodb\bin\mongod in cmd line
	// To open mongo shell, type c:\mongodb\bin\mongo in cmd line

	/*
	* Removes collection.
	*/
	clearDBandInsertStudents: function(studentData, mongoDB) {
		// clear db first before inserting new data
		var me = this;
		Student.remove({}, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('[TASK] DB dropped');
				me._insertStudentInfo(mongoDB, studentData);
			}
		});
	},

	/*
	* Searches for students based on given parameters.
	*/
	getStudents: function(first, middle, last, year) {
		console.log('[START] getStudents - Getting students...');

		// make sure there are not empty or null values
		var parms = {};
		first && (parms.first = this._regex(first));
		middle && (parms.middle = this._regex(middle));
		last && (parms.last = this._regex(last));
		//last && (parms.alias = this._regex(last));
		year && (parms.year = this._regex(year));

		var ret = deferred();
		if (Object.keys(parms).length > 0) {
			console.log(parms);
			Student.find(parms)
				.sort({year: 1, first: 1})
				.exec(function(err, students) {
					err && console.log(err);
					ret.resolve(students);
				});
		} else {
			ret.resolve({});
		}

		console.log('[END] getStudents - Retrieved students.');

		return ret.promise;
	},

	// PRIVATE FUNCTIONS //
	/*
	* Gets the database.
	*/
	_connectToMongoDB: function() {
		return mongoose.connect(process.env.MONGODB_URL).connection;
	},

	/*
	* Insert's student data into the database
	*/
	_insertStudentInfo: function (mongoDB, data) {
		console.log('[START] insertStudentInfo - Inserting students...');

		// Add student data to database
		for	(var i = 1; i < data.length; i++) {
		    var record = data[i];
		    var year = record[0];
		    var last = record[1];
		    var first = record[2];
		    var middle = record[3];
		    var alias = record[4];
		    var isPhoto = !!YearInfo[year];

		    var student = 
		    	this._createStudent(Student, first, last, middle, year, alias, isPhoto);

		    student.save()
		}
		console.log('[END] insertStudentInfo - Students added.');
	},

	/*
	* Creates and return student object.
	*/
	_createStudent: function(Student, first, last, middle, year, alias, isPhoto) {
		return new Student({
			first: first,
			last: last,
			middle: middle,
			alias: alias,
			year: year,
			isPhoto: isPhoto
		});
	},

	/*
	* Modify input so that the query returns any result with search term, and 
	* ignore cases
	*/
	_regex: function(value) {
		return { $regex : new RegExp(value, "i") };
	}
}