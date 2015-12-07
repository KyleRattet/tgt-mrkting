app.directive('header', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $window, $auth, $location, $rootScope) {

    // function isAuthenticated () {
    //   return $auth.isAuthenticated();
    // }
    $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
    };

   $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    },
    templateUrl: 'header/header.html',
  };
});
