var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose');

// connect to mongo db
var url = 'mongodb://localhost:27017/test';
var MongoDB = mongoose.connect(url).connection;
MongoDB.on('error', function(err){
    console.log('Error on connection', err)
});
MongoDB.once('open', function () {
    console.log('DB open...');
});

// set express
var app = express();
app.set('port', (process.env.PORT || 5000));

// get html file which will load dojo and app
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});