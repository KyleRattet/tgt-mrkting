app.directive('popular', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    var topCategories = [
        {name: "Per Capita Income", value: "PCPI_SI"},
        ];

    $scope.richest = [];
    // national data
    getBeaData = function (url, search, assignedVar) {

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
            console.log(cleaned, 'cleaned bea category for income');
            $scope.richest = getTopTen(cleaned);

            console.log($scope.richest, 'assigned var');
            // var stateRankingName = $scope.stateTitle;
            // $scope.position  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            // var stateObject = cleaned[$scope.position -1].DataValue;
            // $scope.stateObjectGDP = cleaned[$scope.position -1].DataValue;

        });


    };





    getBeaData('/query/bea/popular', topCategories[0].value);

    },
    templateUrl: 'popular/popular.html',
  };
});



