app.directive('stateDiscreteBarChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

     $scope.stateDiscreteBarOptions = {
            chart: {
                type: 'discreteBarChart',
                height: 500,
                margin : {
                    top: 15,
                    right: 20,
                    bottom: 85,
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
                    rotateLabels:-30
                },
                yAxis: {
                    axisLabel: 'Percent of Population',
                    axisLabelDistance: -10
                },
                forceY: [0,100],
                color: ['#527CA6','#FF5C26','#FFD24D','#444444','#CACACA', '#B23738','#2C3E50', '#D96D00','#DDB643']
            },
        };
    },
    templateUrl: 'research/charts/state-discretebar-chart.html',
  };
});
