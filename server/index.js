//required modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require('massive');

//config
var config = require('./config');

//express
var app = module.exports = express();

app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

app.use(session({
	secret: config.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));


//massive db
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
	connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var dbSetup = require('./services/dbSetup');
dbSetup.run();


//sessions
var passport = require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());

//passport
app.get('/auth', function (req, res, next) {
	// Is a different state required for callback?
	if (req.query.state)
		req.session.state = req.query.state;

  passport.authenticate('auth0')(req, res, next);
});
app.get('/auth/callback', function(req, res, next) {
	// Check where the user should be redirected
	var state = 'userProfile';
	if (req.session.state)
		state = req.session.state;

	req.session.state = null;

	passport.authenticate('auth0', {
	  successRedirect: '/#!/' + state,
	  failureRedirect: '/#!/'
	})(req, res, next);
});

app.get('/api/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});

//auth policy
var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) return res.status(401)
		.send();
	return next();
};



//controllers
var userCtrl = require('./controllers/userCtrl');
//var coachesCtrl = require('./controllers/coachCtrl');

//player
app.get('/api/me', userCtrl.me);
app.put('/api/user/current', isAuthed, userCtrl.updateCurrent);

// //coach endpoints
// app.get('/api/me', coachCtrl.me);
// app.put('/api/coach/current', isAuthed, coachCtrl.updateCurrent);

//listening on port
var port = config.PORT;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
