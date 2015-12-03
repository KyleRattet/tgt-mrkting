app.directive('nationalDiscreteBarChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

     $scope.nationalDiscreteBarOptions = {
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
                color: ['#527CA6','#FF5C26','#FFD24D','#444444','#EEEEEE', '#C7A0FF', '#D96D00']
            },
            title: {
                enable: true,
                text: 'National Discrete Bar'
            }
        };

    },
    templateUrl: 'research/charts/national-discretebar-chart.html',
  };
});
