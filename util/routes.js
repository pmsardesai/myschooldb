var path = require('path'),
	mongoose = require('mongoose'),
	multiparty = require('multiparty'),
	xlsx = require('node-xlsx'),
	MongoWrapper = require('./MongoWrapper');

module.exports = function(app, dir) {

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


	//~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~//
	/*
	* After user clicks submit on upload page, clear data from mongo db and
	* load new data from xls file
 	*/
	app.post('/upload', function(req, res) {
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			var password = fields.password[0];
			console.log(process.env.SCHOOLDB_PASS);
			if (password === process.env.SCHOOLDB_PASS) {
				var mongoDB = mongoose.connect(process.env.MONGODB_URL).connection;
				MongoWrapper.dropDb(mongoDB);

				try {
					var filePath = files.file[0].path;
					var worksheets = xlsx.parse(filePath);
					var studentData = worksheets[0].data;
					MongoWrapper.insertStudentInfo(mongoDB, studentData);
				} catch (e) {
					console.log("An error occurred while parsing the file.");
				}
			} else {
				console.log("Your password is incorrect.");
			}
		});
	});
};