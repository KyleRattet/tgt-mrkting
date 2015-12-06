app.directive('popular', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    var topCategories = [
        {name: "Per Capita Income", value: "PCPI_SI"},
        {name: "State GDP", value: "GDP_SP"},
        {name: "Disposable Personal Income", value: "PCDPI_SI"},
        {name: "Persons Over 65", value: "DP05_0021PE"},
        {name: "Median Housing Value", value: "DP04_0088E"},
        {name: "Bachelors Degree or Higher", value: "DP02_0067PE"},
        {name: "Unemployed", value: "DP03_0005PE"},
        {name: "Income Bracket", value: "DP03_0057PE"},
        {name: "Elementary School", value: "DP02_0055PE"}
        ];

    getBeaData = function (url, search, variable) {
        var parameters = {category: search};
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            $scope[variable] = getTopTen(cleaned);
        });
    };

    getCensusStateInfo = function (url, search, variable) {
        var parameters = { category: search };
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            var results = response.data;
            var sorted = results.sort(function(a, b) {
                return b[1] - a[1];
            });
            var cleaned = (cleanArray(sorted));
            $scope[variable] = getTopTen(cleaned);
        });
    };

    getBeaData('/query/bea/popular', topCategories[0].value, 'richest');
    getBeaData('/query/bea/popular', topCategories[1].value, 'gdp');
    getBeaData('/query/bea/popular', topCategories[2].value, 'disposable');
    getCensusStateInfo('/query/census/popular', topCategories[3].value, 'seniors');
    getCensusStateInfo('/query/census/popular', topCategories[4].value, 'housing');
    getCensusStateInfo('/query/census/popular', topCategories[5].value, 'bachelors');
    getCensusStateInfo('/query/census/popular', topCategories[6].value, 'unemployed');
    getCensusStateInfo('/query/census/popular', topCategories[7].value, 'income');
    getCensusStateInfo('/query/census/popular', topCategories[8].value, 'elementary');
    },
    templateUrl: 'popular/popular.html',
  };
});



