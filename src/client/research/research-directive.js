app.directive('research', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory, $route, $auth) {


    $scope.chartKeys = [
        ['DP05_0004','0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+'],
        ['DP02_0059','< 9th Grade','9th-12th','High School', 'Some College', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree'],
        ['DP03_0052','<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+'],
        ['DP04_0080','<$50k','$50k-100k','$100k-150k', '$150k-200k', '$200k-300k','$300k-500k', '$500k-1mm','$1mm+'],
        ['DP03_0004','Employed','Unemployed','Armed Forces', 'Not in Labor Force'],
        ['DP05_0072','White','African American','Latino', 'Asian', 'Native Hawaiian', 'American Indian', 'Other'],
        ['DP03_0019','Drive Alone','Carpool','Public Transport', 'Walk', 'Work From Home', 'Other'],
        ['DP02_0111','English Only', 'Other']
    ];

    $scope.labels = ['Age', 'Education', 'Income', 'Home Prices', 'Employment', 'Ethnicity', 'Commuting Style', 'Language Spoken at Home'];

    getNatInfo = function (url) {
        var parameters = {category: $scope.category};
        console.log($scope.category, 'scope category')
        var state = $scope.state_select;
        console.log(state, "scope ")
        var keys = findKeys($scope.chartKeys, $scope.category);
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            $scope.usData = response.data[1];
            $scope.Data = formatChartData(keys ,$scope.usData);
            $scope.nationalDiscreteBarData = [
                {
                    key: "Categoy",
                    values: convertToDiscreteBarData($scope.Data)
                }
                ];
        });
    };

    getStateInfo = function (url) {
        var parameters = {
                category: $scope.category,
                state: $scope.state_select
            };
        var state = $scope.state_select;
        var keys = findKeys($scope.chartKeys, $scope.category);
        $scope.title = getTitle($scope.chartKeys,$scope.labels, $scope.category);
        $scope.stateTitle = findName($scope.state_list,$scope.state_select);
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            $scope.stateData = response.data[1];
            $scope.statePieData = formatChartData(keys ,$scope.stateData);
            $scope.stateDiscreteBarData = [
            {
                key: "Cumulative Return",
                values: convertToDiscreteBarData($scope.statePieData)
            }
            ];
        });
    };

    getBeaGDPData = function (url) {
        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.GDPposition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf($scope.stateTitle) + 1);
            console.log($scope.GDPposition, "scope gdp position line 68")
            $scope.stateGDP = cleaned[$scope.GDPposition -1].DataValue;
            $scope.stateGPDGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.GDPposition],
                "markers": [$scope.GDPposition]
            };
        });
    };

    getPersonalIncomeData = function (url) {
        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.incomePosition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            $scope.stateIncome = cleaned[$scope.incomePosition -1].DataValue;
            $scope.stateIncomeGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.incomePosition],
                "markers": [$scope.incomePosition]
            };
        });
    };

    getPopulationData = function (url) {
        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.populationPosition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            $scope.statePopulation = cleaned[$scope.populationPosition -1].DataValue;
            $scope.statePopulationGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.populationPosition],
                "markers": [$scope.populationPosition]
            };
        });
    };

    getDisposableData = function (url) {
        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.populationPosition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            $scope.statePopulation = cleaned[$scope.populationPosition -1].DataValue;
            $scope.statePopulationGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.populationPosition],
                "markers": [$scope.populationPosition]
            };
        });
    };

    getJobData = function (url) {
        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.jobPosition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            $scope.stateJob = cleaned[$scope.jobPosition -1].DataValue;
            $scope.stateJobGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.jobPosition],
                "markers": [$scope.jobPosition]
            };
        });
    };

    $scope.getNationalData = function () {

        getPopulationData('/query/bea/population');
        getDisposableData('/query/bea/population');
        getJobData('/query/bea/job');
    };


    $scope.getStateData = function () {
        getStateInfo('/query/census/state');
        getNatInfo('/query/census/national')
        $scope.dashboard = true;
        $scope.research = true;
        getBeaGDPData('/query/bea/gdp');
        getPersonalIncomeData('/query/bea/personal-income');
    };

    function retrieve () {
        if($auth.isAuthenticated() === true) {
        $scope.queries = JSON.parse(localStorage.getItem('currentUser')).queries;
        }
    }

    retrieve();

    $scope.run = function (name) {
        $scope.index = findIndex(name ,$scope.queries);
        $scope.category = $scope.queries[$scope.index].category;
        $scope.state_select = $scope.queries[$scope.index].state;
        $scope.dashboard = true;
        $scope.queryInput = true;
        $scope.research = true;
        getPopulationData('/query/bea/population');
        getDisposableData('/query/bea/population');
        getJobData('/query/bea/job');
        getBeaGDPData('/query/bea/gdp');
        getPersonalIncomeData('/query/bea/personal-income');
        getStateInfo('/query/census/state');
        getNatInfo('/query/census/national');
    };

    $scope.sample = function (category, state) {
        $scope.category = category;
        $scope.state_select = state;
        $scope.dashboard = true;
        $scope.queryInput = true;
        $scope.research = true;
        getPopulationData('/query/bea/population');
        getDisposableData('/query/bea/population');
        getJobData('/query/bea/job');
        getBeaGDPData('/query/bea/gdp');
        getPersonalIncomeData('/query/bea/personal-income');
        getStateInfo('/query/census/state');
        getNatInfo('/query/census/national');
    };


    $scope.reloadRoute = function() {
        $route.reload();
    };


    },
    templateUrl: 'research/research.html',
  };
});
