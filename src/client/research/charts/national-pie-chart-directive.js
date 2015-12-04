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
                labelThreshold: 0.05,
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

    },
    templateUrl: 'research/charts/national-pie-chart.html',
  };
});
