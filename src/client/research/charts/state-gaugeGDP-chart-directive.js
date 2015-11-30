app.directive('stateGaugeGdpChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateGDPGaugeOptions = {
            chart: {
                type: 'bulletChart',
                duration: 500
            }
        };

    },
    templateUrl: 'research/charts/state-gaugeGDP-chart.html',
  };
});


