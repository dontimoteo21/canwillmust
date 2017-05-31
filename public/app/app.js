var app = angular.module("app", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	//constants
	var limitUser = function(authService, $state) {
		return authService.getCurrentUser()
			.then(function(response) {
				if (!response.data)
					$state.go('home');
				return response.data;
			})
			.catch(function(err) {
				$state.go('home');
			});
	};

	var getUser = function(authService) {
		return authService.getCurrentUser()
			.then(function(response) {
				return response.data;
			})
	};

	//states
	$stateProvider

		
		.state('home', {
			url: "/",
			templateUrl: "./app/routes/home/homeTmpl.html",
			controller: 'homeCtrl',
			// resolve: {
			// 	user: function(srv){
			// 		srv.getSomething().then(function(response){
			// 			return true
			// 		})
			// 	}
			// }
		})

		
		.state('profile', {
			url: '/profile',
			templateUrl: './app/routes/profile/userProfileTmpl.html',
			controller: 'userProfileCtrl',
			resolve: {
				user: limitUser
			}
		})

		.state('blog', {
			url: '/blog',
			templateUrl: './app/routes/blog/blogTmpl.html',
			controller: 'userProfileCtrl',
			
		});


	//otherwise redirect here
	$urlRouterProvider.otherwise('/');
});
