app.directive('header', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $window, $auth, $location, $rootScope) {
      $scope.userName = $rootScope.userName;

    },
    templateUrl: 'header/header.html',
  };
});
