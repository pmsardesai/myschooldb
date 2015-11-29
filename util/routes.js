var deferred = require("deferred"),
	multiparty = require('multiparty'),
	path = require('path'),
	xlsx = require('node-xlsx'),
	MongoWrapper = require('./MongoWrapper');

module.exports = function(app, dir, mongoDB) {

	//~~~~~~~~~~~~ GET ~~~~~~~~~~~~//
	/*
	* Whenever the user navigates to a new page, return the index.html file.
	* React router will take care of displaying the appropriate page.
	*/	
	var directPage = function(req, res) {
		res.sendFile(path.join(dir, 'index.html'));
	}
	app.get('/', directPage);
	app.get('/upload', directPage);

	/*
	* Send results back based on what the user wants
	*/
	app.get('/search', function(req, res) {
		var promise = 
			MongoWrapper.getStudents(
				req.query.first, 
				req.query.middle,
				req.query.last,
				req.query.year);

		promise.then(function(success) { 
			res.send(success);
		}, function(error) {
			res.send({}); // on error, return empty object
		})
	});

	//~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~//
	/*
	* After user clicks submit on upload page, clear data from mongo db and
	* load new data from xls file
 	*/
	app.post('/upload', function(req, res) {
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			var password = fields.password[0];
			if (password === process.env.SCHOOLDB_PASS) {
				try {
					var filePath = files.file[0].path;
					var worksheets = xlsx.parse(filePath);
					var studentData = worksheets[0].data;
					MongoWrapper.clearDBandInsertStudents(studentData, mongoDB);
				} catch (e) {
					console.log("An error occurred while parsing the file.");
				}
			} else {
				console.log("Your password is incorrect.");
			}
		});
	});
};