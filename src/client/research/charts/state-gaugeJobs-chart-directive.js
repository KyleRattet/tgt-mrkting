app.directive('stateGaugeJobsChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateJobGaugeOptions = {
            chart: {
                type: 'bulletChart',
                duration: 500,
                width: 250,
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
    templateUrl: 'research/charts/state-gaugeJobs-chart.html',
  };
});
