app.directive('sideNavBar', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $window, $auth, $location) {
      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      console.log($auth.isAuthenticated())

      $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
        $location.path('/');
      };
    },
    templateUrl: 'nav/nav.html',
  };
});


