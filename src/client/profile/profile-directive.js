app.directive('profile', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, $auth, $timeout) {

      function hideResearch () {
        $scope.input = false;
        $scope.action = true;
      }

      hideResearch();

      function messageTimeout () {
       $scope.update = false;
       $scope.message = false;
      }

      $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
      $scope.newEmail = $scope.email;
      $rootScope.name = JSON.parse(localStorage.getItem('currentUser')).name;
      $scope.queries = JSON.parse(localStorage.getItem('currentUser')).queries;
      $scope.updateUser = function(email, password) {
        $scope.message = "";
        var payload = {};
        payload.email = email;
        payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
        if(password) {
          payload.password = password;
        }

        $http.put('/auth/update', payload)
          .success(function (data, status) {
            if(status === 200 && data){
              delete $window.localStorage.currentUser;
              $window.localStorage.currentUser = JSON.stringify(data);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
              $scope.message = "Email Address Updated!";
              $scope.password = "";
              $timeout(messageTimeout, 2500);
            } else {
              console.log('handle error');
            }
          })
          .error(function (err) {
            console.log('handle error: ', err);
          });
      };

    },
    templateUrl: 'profile/profile.html',
  };
});

