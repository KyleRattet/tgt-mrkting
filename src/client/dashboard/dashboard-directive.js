app.directive('dashboard', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location, $window, $rootScope, httpFactory, $route, $routeParams, $timeout) {


    $scope.showme = false;

    function messageTimeout () {
      $scope.success = false;
      $scope.showme = false;
    }

    $scope.addQuery = function(email, password) {
        $scope.message = "";
        $scope.save = true;
        $scope.success = false;
        var payload = {};
        payload.date = new Date();
        payload.name = $scope.queryName;
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
              $scope.success = true;
              $scope.message = "This query has been saved.";
              $scope.password = "";
              $scope.queryInput = true;
              $timeout(messageTimeout, 2500);
              $scope.queryName ="";
            } else {
              console.log('handle error');
            }
          })
          .error(function (err) {
            console.log('handle error: ', err);
          });

      };

      function message () {
        if($auth.isAuthenticated() === true) {
          $scope.saveButton = "Save As";
          $scope.saveEnable = 1;
        } else {
          $scope.saveButton = "Must Be Logged In to Save";
          $scope.saveEnable = 0;
        }
      }

      message();

    },
    templateUrl: 'dashboard/dashboard.html',
  };
});
