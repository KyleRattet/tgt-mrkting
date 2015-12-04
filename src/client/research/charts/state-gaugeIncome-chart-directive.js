app.directive('stateGaugeIncomeChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateIncomeGaugeOptions = {
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
    templateUrl: 'research/charts/state-gaugeIncome-chart.html',
  };
});
