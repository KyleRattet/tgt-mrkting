app.directive('statePieChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.stateOptions = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                donut:"true",
                donutRatio:".50",
                duration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 5
                    }
                },
                color: ['#527CA6','#FF5C26','#FFD24D','#444444','#CACACA', '#B23738','#2C3E50', '#D96D00','#DDB643']
            },
        };
        $scope.searchAgain = function  () {
        $scope.dashboard = false;
        $scope.research = false;
        $scope.usData='';
        $scope.Data='';
        $scope.nationalDiscreteBarData='';
        $scope.stateTitle='';
        $scope.stateData='';
        $scope.statePieData='';
        $scope.stateDiscreteBarData='';
        $scope.category='';
        $scope.state_select='';

      };

    },
    templateUrl: 'research/charts/state-pie-chart.html',
  };
});
