app.directive('header', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $window, $auth, $location, $rootScope) {
    },
    templateUrl: 'header/header.html',
  };
});
