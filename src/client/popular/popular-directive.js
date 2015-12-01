app.directive('popular', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    var topCategories = [
        {name: "Per Capita Income", value: "PCPI_SI"},
        {name: "State GDP", value: "GDP_SP"},
        {name: "Disposable Personal Income", value: "PCDPI_SI"},
        {name: "Persons Over 65", value: "DP05_0021PE"},
        ];




    // national data from BEA
    getBeaData = function (url, search, variable) {

        var parameters = {
            category: search
        };

        httpFactory.get(url, {params: parameters})
        .then(function(response){
            console.log(response, "get bea data response");
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
          $scope[variable] = getTopTen(cleaned);

        });

    };

    //state data from CENSUS
    getCensusStateInfo = function (url, search, variable) {

        var parameters = {
          category: search
            };
        // var state = $scope.state_select;
        // var keys = findKeys($scope.chartKeys, $scope.category);
        // $scope.title = getTitle($scope.chartKeys,$scope.labels, $scope.category);
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            console.log(response, "state data")
            var results = response.data;
            console.log(results, 'results from old age')
            var sorted = results.sort(function(a, b) {
                return b[1] - a[1];
            });
            console.log(sorted, 'sorted old age data')
            var cleaned = (cleanArray(sorted));
            $scope[variable] = getTopTen(cleaned);
            // $scope.stateTitle = response.data[1][0];
            // $scope.stateData = response.data[1];

            // $scope.statePieData = formatChartData(keys ,$scope.stateData);
            // $scope.stateDiscreteBarData = [
            // {
            //     key: "Cumulative Return",
            //     values: convertToDiscreteBarData($scope.statePieData)
            // }
            // ];

        });
    };


    getBeaData('/query/bea/popular', topCategories[0].value, 'richest');
    getBeaData('/query/bea/popular', topCategories[1].value, 'gdp');
    getBeaData('/query/bea/popular', topCategories[2].value, 'disposable');
    getCensusStateInfo('/query/census/popular', topCategories[3].value, 'seniors');
    },
    templateUrl: 'popular/popular.html',
  };
});



