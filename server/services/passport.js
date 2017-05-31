//login
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

//app
var app = require('./../index');
var db = app.get('db');

// config
var config = require('./../config');

// login pathway
passport.use(new Auth0Strategy(config.AUTH_CONFIG, function(accessToken, refreshToken, extraParams, profile, done) {
  db.user.read_email([profile.emails[0].value], function(err, user) {

    user = user[0];

    if (err) {
      return done(err);
    }

    else if (!user) {

      if (!profile.name.givenName)
        profile.name = {
          givenName: profile.displayName,
          familyName: null
        };

      // create
      db.user.insert([profile.name.givenName, profile.name.familyName, profile.emails[0].value], function(err, user) {
        if (err) {
          return done(err);
        }

        return done(null, user[0]);
      })
    }

    
    else if (!user.name_last && profile.name.familyName) {

      // update name
      user.name_first = profile.name.givenName;
      user.name_last = profile.name.familyName;

      // update user
      db.users.save(user, function(err, user) {
        if (err) {
          console.log('User update error on login', err);

          return done(err);
        }

        return done(null, user);
      });
    }
    
    else {
      return done(null, user);
    }
  });
}));

// user is now on the session
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;
