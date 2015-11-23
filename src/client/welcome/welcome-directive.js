app.directive('welcome', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location, $window, $rootScope) {

    },
    templateUrl: 'welcome/welcome.html',
  };
});
