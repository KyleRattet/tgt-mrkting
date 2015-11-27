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
                    axisLabel: 'Age'

                },
                yAxis: {
                    axisLabel: 'Percent of Population',
                    axisLabelDistance: -10,
                    showMaxMin: true
                },
                forceY: [0,1],


            },
            title: {
                enable: true,
                text: 'State Discrete Bar'
            }
        };

    },
    templateUrl: 'research/charts/state-discretebar-chart.html',
  };
});
