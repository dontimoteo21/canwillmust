// //var app
// var app = require('./../index');
// var db = app.get('db');

// module.exports = {
// 	//current user
// 	me: function(req, res, next) {
// 		if (!req.coach) {
// 			return res.status(200).send(null);
// 		}

// 		return res.status(200).send(req.coach);
// 	},

// 	//update
// 	updateCurrent: function(req, res, next) {
// 		var updateCoach = req.body;
// 		updateCoach.coach_id = req.coach.coach_id;

// 		db.coach.save(updateCoach, function(err, coach) {
// 			if (err) {
// 				console.log('Coach update error', err);

// 				return res.status(401)
// 					.send(err);
// 			}

// 			req.session.passport.coach = coach;

// 			res.status(200).send(coach);
// 		});
// 	}
// };
