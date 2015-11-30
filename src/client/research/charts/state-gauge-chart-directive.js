app.directive('stateGaugeChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateGaugeOptions = {
            chart: {
                type: 'bulletChart',
                duration: 500
            }
        };

    },
    templateUrl: 'research/charts/state-gauge-chart.html',
  };
});


