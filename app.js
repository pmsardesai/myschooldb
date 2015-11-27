var express = require('express'),
	path = require('path'),
	routes = require('./util/routes');

// set express
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'build')));

routes(app, __dirname);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


// THURSDAY
// parse out file completely and add to mongo db (done)
// fix file directory structure

// FRIDAY
// start building interface for searching

// SATURDAY
// get searching to work