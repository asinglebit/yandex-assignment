// Requirements

var Config = require('./app/config/config');
var Express = require('express');
var BodyParser = require('body-parser');
var MethodOverride = require('method-override');

var Mongoose = require('mongoose');

// Application config

var app = Express();
app.use(BodyParser.json({limit: '5mb'}));
app.use(BodyParser.json({ type: 'application/vnd.api+json', limit: '5mb' }));
app.use(BodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(MethodOverride('X-HTTP-Method-Override'));
app.use(Express.static(__dirname + Config.web));

// Routes

app.use('/', require('./app/routes')(__dirname));

// Database connection

Mongoose.connect(Config.url);
var Database = Mongoose.connection;
Database.on('error', console.error.bind(console, 'connection error:'));
Database.once('open', function() {
  console.log('Connected to ' + Config.url);
});

// Start server

app.listen(Config.port);
console.log('Listening on port ' + Config.port);

module.exports = app;
