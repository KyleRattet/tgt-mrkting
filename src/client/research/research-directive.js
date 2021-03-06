app.directive('research', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory, $route, $auth) {

    $rootScope.input = true;
    $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    $scope.chartKeys = [
        ['DP05_0004','0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+'],
        ['DP02_0059','< 9th Grade','9th-12th','High School', 'Some College', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree'],
        ['DP03_0052','<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+'],
        ['DP04_0080','<$50k','$50k-100k','$100k-150k', '$150k-200k', '$200k-300k','$300k-500k', '$500k-1mm','$1mm+'],
        ['DP03_0004','Employed','Unemployed','Armed Forces', 'Not in Labor Force'],
        ['DP05_0072','White','African American','Latino', 'Asian', 'Native Hawaiian', 'American Indian', 'Other'],
        ['DP03_0019','Drive Alone','Carpool','Public Transport', 'Walk', 'Work From Home', 'Other'],
        ['DP02_0111','English Only', 'Other'],
        ['DP04_0125','<$200', '$200-$299', '$300-$499', '$500-$749', '$750-$999', '$1000-$1499', '>$1500'],
        ['DP02_0089','In State', 'Out of State', 'Foreign Born', 'Other'],
        ['DP04_0057','Zero', 'One', 'Two', 'Three Or More'],
        ['DP02_0053','Preschool', 'Kindergarten', 'Grades 1-8', 'High School', 'College or Graduate'],
        ['DP02_0031','Never Married', 'Now Married', 'Seperated', 'Divroced', 'Widowed'],
        ['DP02_0025','Never Married', 'Now Married', 'Seperated', 'Divroced', 'Widowed'],
        ['DP04_0025','1939 or Earlier', '1940-1949', '1950-1959', '1960-1969', '1970-1979', '1980-1989', '1990-1999', '2000-2009','2010 or Later'],
        ['DP04_0050','2010 or Later', '2000-2009', '1990-1999', '1980-1989', '1970-1979', '1969 or Earlier'],
        ['DP04_0062','Utility Gas', 'Tank LP Gas', 'Electricity', 'Fuel Oil', 'Coal', 'Wood', 'Solar', 'Other Fuel', 'No Fuel Used'],
        ['DP04_0091','Without a Mortgage', 'With a Mortgage'],
        ['DP04_0093','Less than $300', '$300-$499', '$500-$699', '$700-$999','$1000-$1499','$1500-$1999', '$2000 or More']

    ];

    $scope.labels = ['Age', 'Education Attained', 'Income', 'Home Prices', 'Employment', 'Ethnicity', 'Commuting Style', 'Language Spoken at Home', 'Rent Cost (Monthly)', 'Place of Birth', 'Vehicles Available (Household)', 'Education Enrollment (Age 3+)', 'Marital Status - Female','Marital Status - Male','Housing - Year Built','Housing - Year Moved Into','Housing - Heating Fuel','Housing - With or Without A Mortgage','Housing - Monthly Mortgage'];

    getNatInfo = function (url) {
        var parameters = {category: $scope.category};
        var state = $scope.state_select;
        var keys = findKeys($scope.chartKeys, $scope.category);
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            // $scope.isLoad=true;
            $scope.usData = response.data[1];
            $scope.Data = formatChartData(keys ,$scope.usData);
            $scope.nationalDiscreteBarData = [
                {
                    key: "Categoy",
                    values: convertToDiscreteBarData($scope.Data)
                }
                ];
            $scope.loader=true;
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
            $scope.loader=true;
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
            $scope.stateGDP = cleaned[$scope.GDPposition -1].DataValue;
            $scope.stateGPDGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.GDPposition],
                "markers": [$scope.GDPposition]
            };
            $scope.spinning=true;
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
            $scope.spinning=true;
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
            $scope.spinning=true;
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
            $scope.spinning=true;
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
            $scope.spinning=true;
        });
    };

    $scope.getNationalData = function () {

        getPopulationData('/query/bea/population');
        // getDisposableData('/query/bea/population');
        getJobData('/query/bea/job');
        getBeaGDPData('/query/bea/gdp');
        getPersonalIncomeData('/query/bea/personal-income');
    };


    $scope.getStateData = function () {
        getStateInfo('/query/census/state');
        getNatInfo('/query/census/national')
        $scope.dashboard = true;
        $scope.research = true;

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
