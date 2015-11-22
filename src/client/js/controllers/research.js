app.controller('queryCtrl', function($scope, $rootScope, $http, $window) {


  // console.log(JSON.parse(localStorage.getItem('currentUser'))._id)
  // $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
  // $scope.newEmail = $scope.email;

  $scope.addQuery = function(email, password) {
    $scope.message = "";
    // create payload
    var payload = {};
    payload.name = $scope.queryName;
    payload.url = $scope.queryUrl;
    // var _id = JSON.parse(localStorage.getItem('currentUser'))._id;
    payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(payload, 'payload');
    if(password) {
      payload.password = password;
    }
    // send XHR request
    $http.put('/auth/addQuery', payload)
      .success(function (data, status) {
        // if(status === 200 && data){
        //   delete $window.localStorage.currentUser;
        //   $window.localStorage.currentUser = JSON.stringify(data);
        //   $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //   $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
        //   $scope.message = "Updated!";
        //   $scope.password = "";
        // } else {
        //   console.log('handle error');
        // }
      })
      .error(function (err) {
        console.log('handle error: ', err);
      });
  };

});
