import mongoose from 'mongoose';

module.exports = {
	parseFile: function() {
		
	},

	connectDB: function() {
		let url = 'mongodb://localhost:27017/test';
		let MongoDB = mongoose.connect(url).connection;
		MongoDB.on('error', 
			function(err) {
				console.log('Error on connection', err);
			}
		);
		MongoDB.on('open', 
			function() {
				console.log('DB open...');
			}
		);

		return MongoDB;
	},

	clearDB: function() {
		let connection = mongoose.connect("mongodb://localhost/mydb").connection;
		connection.db.dropDatabase();
	}
};