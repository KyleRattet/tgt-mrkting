app.directive('dashboard', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location, $window, $rootScope, httpFactory, $route, $routeParams) {

    $scope.addQuery = function(email, password) {
        $scope.message = "";
        var payload = {};
        payload.name = $scope.queryName;
        payload.category = $scope.category;
        payload.state = $scope.state_select;
        payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
        if(password) {
          payload.password = password;
        }
        $http.put('/auth/addQuery', payload)
          .success(function (data, status) {
          })
          .error(function (err) {
            console.log('handle error: ', err);
          });
      };

    },
    templateUrl: 'dashboard/dashboard.html',
  };
});
