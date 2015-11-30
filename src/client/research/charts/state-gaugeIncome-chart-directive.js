app.directive('stateGaugeIncomeChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateIncomeGaugeOptions = {
            chart: {
                type: 'bulletChart',
                duration: 500
            }
        };

    },
    templateUrl: 'research/charts/state-gaugeIncome-chart.html',
  };
});
