app.directive('nationalPieChartData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.Options = {
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
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                },
                color: ['#527CA6','#FF5C26','#FFD24D','#444444','#EEEEEE', '#C7A0FF', '#D96D00']

            },
            title: {
                enable: true,
                text: 'Pie Chart'
            }
        };

    },
    templateUrl: 'research/charts/national-pie-chart.html',
  };
});
