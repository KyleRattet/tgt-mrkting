app.directive('login', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $auth, $rootScope, $window, $location) {
      //$auth is the injection for satellizer

        $scope.login = function() {

          var user = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
          };

          $auth.login(user)
            .then(function(response) {
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              $location.path('/home');
            })
            .catch(function(response) {
              console.log(response);
            });

        };

        $scope.authenticate = function(provider) {

          $auth.authenticate(provider)
            .then(function(response) {
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              $location.path('/home');
            })
          .catch(function(response) {
            console.log(response);
          });



        };
    },
    templateUrl: 'login/login.html',
  };
});

