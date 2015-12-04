app.directive('dashboard', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location, $window, $rootScope, httpFactory, $route, $routeParams) {


    $scope.addQuery = function(email, password) {
        $scope.message = "";
        var payload = {};
        payload.date = new Date();
        payload.name = $scope.queryName;
        console.log($scope.queryName, 'payload query name');
        payload.category = $scope.category;
        payload.state = $scope.state_select;
        payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
        if(password) {
          payload.password = password;
        }
        $http.put('/auth/addQuery', payload)
          .success(function (data, status) {
            if(status === 200 && data){
              delete $window.localStorage.currentUser;
              $window.localStorage.currentUser = JSON.stringify(data);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
              $scope.message = "Updated query";
              $scope.password = "";
            } else {
              console.log('handle error');
            }
          })
          .error(function (err) {
            console.log('handle error: ', err);
          });
        console.log(payload, "payload from addd query");
        $scope.queries.push(payload);
      };



    },
    templateUrl: 'dashboard/dashboard.html',
  };
});
