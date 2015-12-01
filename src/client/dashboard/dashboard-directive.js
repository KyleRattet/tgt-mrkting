app.directive('dashboard', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location, $window, $rootScope, httpFactory) {



    },
    templateUrl: 'dashboard/dashboard.html',
  };
});
