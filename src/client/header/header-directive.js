app.directive('header', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $window, $auth, $location) {

    },
    templateUrl: 'header/header.html',
  };
});
