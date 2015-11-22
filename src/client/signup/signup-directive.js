app.directive('signup', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location) {
     $scope.signup = function() {

        var user = {
          name: $scope.name,
          email: $scope.email,
          password: $scope.password
        };

        $auth.signup(user)
          .then(function(response){
            $location.path('/login');
          })
          .catch(function(response) {
            console.log(response.data);
          });

      };
    },
    templateUrl: 'signup/signup.html',
  };
});







// app.controller('signupCtrl', function($scope, $http, $auth, $location) {

//   $scope.signup = function() {

//     var user = {
//       name: $scope.name,
//       email: $scope.email,
//       password: $scope.password
//     };

//     $auth.signup(user)
//       .then(function(response){
//         $location.path('/login');
//       })
//       .catch(function(response) {
//         console.log(response.data);
//       });

//   };

// });
