app.directive('dashboard', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $http, $auth, $location, $window, $rootScope, httpFactory) {



      //pie test with dummy data
      $scope.nationalOptions = {
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
                }
            }
        };

        //pie test with dummy data
        $scope.nationalData = [
            {
                key: "0-5",
                y: 10
            },
            {
                key: "5-9",
                y: 20
            },
            {
                key: "10-14",
                y: 30
            },
            {
                key: "15-19",
                y: 40
            }

        ];

        //bar chart test with dummy data
        $scope.optionsDiscreteBar = {
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
                    axisLabelDistance: -10
                },

            },
            title: {
                enable: true,
                text: 'Age Brackets (%)'
            }
        };

        //bar chart test with dummy data
        $scope.dataDiscreteBar = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "0-5" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "5-9" ,
                        "value" : 5
                    } ,
                    {
                        "label" : "10-14" ,
                        "value" : 12
                    } ,
                    {
                        "label" : '15-19' ,
                        "value" : 6
                    } ,
                    {
                        "label" : "20-24" ,
                        "value" : 8
                    } ,
                    {
                        "label" : "35-44" ,
                        "value" : 10
                    } ,
                    {
                        "label" : "45-54" ,
                        "value" : 7
                    } ,
                    {
                        "label" : "60-64" ,
                        "value" : 21
                    } ,
                    {
                        "label" : "65-74" ,
                        "value" : 4
                    } ,
                    {
                        "label" : "75-84" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "85+" ,
                        "value" : 8
                    }
                ]
            }
        ];
    },
    templateUrl: 'dashboard/dashboard.html',
  };
});
