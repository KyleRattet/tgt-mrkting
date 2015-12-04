app.directive('stateGaugePopulationChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.statePopulationGaugeOptions = {
            chart: {
                type: 'bulletChart',
                duration: 500,
                width: 280,
                height: 70,
                orient: 'left',
                margin: {
                    left: 7,
                    right:7,
                },
                color: '#FFD24D',
            },
        };

    },
    templateUrl: 'research/charts/state-gaugePopulation-chart.html',
  };
});
