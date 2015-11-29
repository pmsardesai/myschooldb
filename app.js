var express = require('express'),
	MongoWrapper = require('./util/MongoWrapper'),
	path = require('path'),
	routes = require('./util/routes');

// set express
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// create db and set routes
var mongoDB = MongoWrapper._connectToMongoDB();
routes(app, __dirname, mongoDB);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});