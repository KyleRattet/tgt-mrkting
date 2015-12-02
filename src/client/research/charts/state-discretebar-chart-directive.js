app.directive('stateDiscreteBarChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

     $scope.stateDiscreteBarOptions = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Category'

                },
                yAxis: {
                    axisLabel: 'Percent of Population',
                    axisLabelDistance: -10
                },
                forceY: [0,30],


            },
            title: {
                enable: true,
                text: 'State Discrete Bar'
            }
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
    templateUrl: 'research/charts/state-discretebar-chart.html',
  };
});
