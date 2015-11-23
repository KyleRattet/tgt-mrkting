app.directive('stateCodeData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.state_list = [
        {name: "Alabama", value: "01"},
        {name: "Alaska", value: "02"},
        {name: "Arizona", value: "04"},
        {name: "Arkansas", value: "05"}
      ];

    },
    templateUrl: 'research/state/state-codes.html',
  };
});


