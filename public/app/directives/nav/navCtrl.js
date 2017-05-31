
angular.module("app").controller("navCtrl", function($scope, $rootScope, authService, $state) {

  
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('home');
    });
  };

  $rootScope.$on('user', function(event, user) {
    $scope.user = user;
  });

});
