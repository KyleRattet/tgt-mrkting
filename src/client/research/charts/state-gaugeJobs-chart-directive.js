app.directive('stateGaugeJobsChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateJobGaugeOptions = {
            chart: {
                type: 'bulletChart',
                duration: 500,
                width: 280,
                height: 80,
                orient: 'left',
                margin: {
                    left: 5,
                    right:10
                }
            },

        };

    },
    templateUrl: 'research/charts/state-gaugeJobs-chart.html',
  };
});
