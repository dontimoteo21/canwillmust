//required
var app = require('./../index');
var db = app.get('db');
var config = require('./../config');

//console ouput, initializing log
var allowConsoleOutput = config.INITIALIZE_LOG;
var log = function(input) {
	if (allowConsoleOutput) {
		console.log(input);
	}
};

//function in order to initialize
module.exports = {
	run: function() {
		log('Initializing database');

		db.initialize.tables_initialize(function(err, table) {
			if (err) return log('Some tables failed to create');
			else log('Tables successfully initialized');
		});
	}
};
