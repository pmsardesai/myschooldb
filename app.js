var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose');

// set express
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'build')));

// Get html when page is refreshed
var directPage = function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
}
app.get('/', directPage);
app.get('/upload', directPage);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});