app.directive('research', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

    $scope.chartKeys = [
        ['DP05_0004','0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+'],
        ['DP02_0059','< 9th Grade','9th-12th No Diploma','High School Graduate', 'Some College, No Degree', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree'],
        ['DP03_0052','<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+'],
        ['DP04_0080','<$50k','$50k-100k','$100k-150k', '$150k-200k', '$200k-300k', '$300k-500k', '$500k-1mm','$1mm+'],
        ['DP03_0004','Employed','Unemployed','Armed Forces', 'Not in Labor Force'],
        ['DP05_002','White','African American','Latino', 'Asian', 'Native Hawaiian and Other Pacific Islander', 'American Indian/Alaskan Native', 'Some Other Race']
    ];

    getNatInfo = function (url) {

    var parameters = {
      category: $scope.category
        };
    var state = $scope.state_select;

    var keys = findKeys($scope.chartKeys, $scope.category);

    httpFactory.get(url, {params: parameters})
    .then(function(response){

        $scope.usData = response.data[1];
        $scope.Data = formatChartData(keys ,$scope.usData);

        $scope.nationalDiscreteBarData = [
            {
                key: "Cumulative Return",
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
        httpFactory.get(url, {params: parameters})
        .then(function(response){
            console.log(response, "state data")
            $scope.stateTitle = response.data[1][0];
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

    //national gdp data
    getBeaGDPDATA = function (url) {

        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.position  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            var stateObject = cleaned[$scope.position -1].DataValue;
            $scope.stateObjectGDP = cleaned[$scope.position -1].DataValue;

        });
        };

    //national gdp data
      getBeaGDPData = function (url) {

        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.GDPposition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            // var stateObject = cleaned[$scope.position -1].DataValue;
            $scope.stateGDP = cleaned[$scope.GDPposition -1].DataValue;
            $scope.stateGPDGaugeData = {
                "ranges": [0,25,50],
                "measures": [$scope.GDPposition],
                "markers": [$scope.GDPposition]
            };
            });
            };

    //state gdp data
      getPersonalIncomeData = function (url) {

        httpFactory.get(url)
        .then(function(response){
            var results = response.data.BEAAPI.Results.Data;
            console.log(results, 'personal income results')
            var sorted = results.sort(function(a, b) {
                return b.DataValue - a.DataValue;
            });
            var cleaned = (cleanArray(sorted));
            var stateRankingName = $scope.stateTitle;
            $scope.incomePosition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
            // var stateObject = cleaned[$scope.position -1].DataValue;
            $scope.stateIncome = cleaned[$scope.incomePosition -1].DataValue;

        });
    };

      // national api testing
      $scope.getNationalData = function () {
        getNatInfo('/query/census/national');

      };

      $scope.getStateData = function () {
        getStateInfo('/query/census/state');
        getBeaGDPData('/query/bea/gdp');
        getPersonalIncomeData('/query/bea/personal-income');
      };
      // console.log(JSON.parse(localStorage.getItem('currentUser'))._id)
      // $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
      // $scope.newEmail = $scope.email;

      $scope.addQuery = function(email, password) {
        $scope.message = "";
        // create payload
        var payload = {};
        payload.name = $scope.queryName;
        payload.url = $scope.queryUrl;
        // var _id = JSON.parse(localStorage.getItem('currentUser'))._id;
        payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
        console.log(payload, 'payload');
        if(password) {
          payload.password = password;
        }
        // send XHR request
        $http.put('/auth/addQuery', payload)
          .success(function (data, status) {
            // if(status === 200 && data){
            //   delete $window.localStorage.currentUser;
            //   $window.localStorage.currentUser = JSON.stringify(data);
            //   $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            //   $scope.email = JSON.parse(localStorage.getItem('currentUser')).email;
            //   $scope.message = "Updated!";
            //   $scope.password = "";
            // } else {
            //   console.log('handle error');
            // }
          })
          .error(function (err) {
            console.log('handle error: ', err);
          });
      };


    },
    templateUrl: 'research/research.html',
  };
});


