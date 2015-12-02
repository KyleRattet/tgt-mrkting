// app.directive('research', function () {
//   return {
//     restrict: 'E',
//     controller: function ($scope, $rootScope, $http, $window, httpFactory) {

//     // //query data object
//     // $scope.query = {};

//     $scope.chartKeys = [
//         ['DP05_0004','0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+'],
//         ['DP02_0059','< 9th Grade','9th-12th No Diploma','High School Graduate', 'Some College, No Degree', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree'],
//         ['DP03_0052','<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+'],
//         ['DP04_0080','<$50k','$50k-100k','$100k-150k', '$150k-200k', '$200k-300k','$300k-500k', '$500k-1mm','$1mm+'],
//         ['DP03_0004','Employed','Unemployed','Armed Forces', 'Not in Labor Force'],
//         ['DP05_0072','White','African American','Latino', 'Asian', 'Native Hawaiian and Other Pacific Islander', 'American Indian/Alaskan Native', 'Some Other Race']
//     ];

//     $scope.labels = ['Age', 'Education', 'Income', 'Home Prices', 'Employment', 'Ethnicity'];

//     getNatInfo = function (url) {

//         var parameters = {category: $scope.category};
//         var state = $scope.state_select;
//         var keys = findKeys($scope.chartKeys, $scope.category);

//         httpFactory.get(url, {params: parameters})
//         .then(function(response){
//             $scope.usData = response.data[1];
//             $scope.Data = formatChartData(keys ,$scope.usData);
//             $scope.nationalDiscreteBarData = [
//                 {
//                     key: "Cumulative Return",
//                     values: convertToDiscreteBarData($scope.Data)
//                 }
//                 ];
//         });

//     };

//     getStateInfo = function (url) {
//         // console.log($scope.stateData, "state data response first")

//         var parameters = {
//           category: $scope.category,
//           state: $scope.state_select
//             };
//             console.log(parameters, 'parameters from state info search')
//         var state = $scope.state_select;
//         var keys = findKeys($scope.chartKeys, $scope.category);
//         $scope.title = getTitle($scope.chartKeys,$scope.labels, $scope.category);
//         httpFactory.get(url, {params: parameters})
//         .then(function(response){

//             $scope.stateTitle = response.data[1][0];
//             $scope.stateData = response.data[1];
//             console.log($scope.stateData, "state data")
//             $scope.statePieData = formatChartData(keys ,$scope.stateData);
//             console.log($scope.statePieData, "state pie data")
//             $scope.stateDiscreteBarData = [
//             {
//                 key: "Cumulative Return",
//                 values: convertToDiscreteBarData($scope.statePieData)
//             }
//             ];
//             console.log($scope.stateDiscreteBarData, "state discrete pie data")

//         });
//         $scope.stateTitle='';
//         $scope.stateData='';
//         $scope.statePieData='';
//         $scope.stateDiscreteBarData='';
//         $scope.category='';
//         $scope.state_select='';


//     };

//     //national gdp data
//     getBeaGDPData = function (url) {

//         httpFactory.get(url)
//         .then(function(response){
//             var results = response.data.BEAAPI.Results.Data;
//             var sorted = results.sort(function(a, b) {
//                 return b.DataValue - a.DataValue;
//             });
//             var cleaned = (cleanArray(sorted));
//             var stateRankingName = $scope.stateTitle;
//             $scope.GDPposition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
//             $scope.stateGDP = cleaned[$scope.GDPposition -1].DataValue;
//             $scope.stateGPDGaugeData = {
//                 "ranges": [0,25,50],
//                 "measures": [$scope.GDPposition],
//                 "markers": [$scope.GDPposition]
//             };
//         });
//     };

//     //state gdp data
//     getPersonalIncomeData = function (url) {

//         httpFactory.get(url)
//         .then(function(response){
//             var results = response.data.BEAAPI.Results.Data;
//             console.log(results, 'personal income results')
//             var sorted = results.sort(function(a, b) {
//                 return b.DataValue - a.DataValue;
//             });
//             var cleaned = (cleanArray(sorted));
//             var stateRankingName = $scope.stateTitle;
//             $scope.incomePosition  = (cleaned.map(function(e) { return e.GeoName; }).indexOf(stateRankingName) + 1);
//             $scope.stateIncome = cleaned[$scope.incomePosition -1].DataValue;
//             $scope.stateIncomeGaugeData = {
//                 "ranges": [0,25,50],
//                 "measures": [$scope.incomePosition],
//                 "markers": [$scope.incomePosition]
//             };
//         });
//     };

//       // national api testing
//     $scope.getNationalData = function () {
//         getNatInfo('/query/census/national');
//       };

//     $scope.getStateData = function () {
//         $scope.dashboard = true;
//         $scope.research = true;
//         getStateInfo('/query/census/state');
//         getBeaGDPData('/query/bea/gdp');
//         getPersonalIncomeData('/query/bea/personal-income');
//     };

//       $scope.addQuery = function(email, password) {
//         $scope.message = "";
//         var payload = {};
//         payload.name = $scope.queryName;
//         payload.category = $scope.category;
//         payload.state = $scope.state_select;
//         payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
//         console.log(payload, 'payload');
//         if(password) {
//           payload.password = password;
//         }

//         $http.put('/auth/addQuery', payload)
//           .success(function (data, status) {
//           })
//           .error(function (err) {
//             console.log('handle error: ', err);
//           });
//       };



//       $scope.retrieve = function () {
//         $scope.queries = JSON.parse(localStorage.getItem('currentUser')).queries;
//       };

//       $scope.run = function (name) {
//         $scope.index = findIndex(name ,$scope.queries);
//         $scope.category = $scope.queries[$scope.index].category;
//         $scope.state_select = $scope.queries[$scope.index].state;
//         getBeaGDPData('/query/bea/gdp');
//         getPersonalIncomeData('/query/bea/personal-income');
//         getStateInfo('/query/census/state');
//         getNatInfo('/query/census/national');
//       };

//       $scope.orig = angular.copy($scope.stateData);

//       $scope.reset = function () {
//           $scope.stateData = angular.copy($scope.orig);
//       };


//     },
//     templateUrl: 'research/research.html',
//   };
// });

app.directive('research', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory, $route) {

    // //query data object
    $scope.query = {};

    $scope.chartKeys = [
        ['DP05_0004','0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+'],
        ['DP02_0059','< 9th Grade','9th-12th No Diploma','High School Graduate', 'Some College, No Degree', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree'],
        ['DP03_0052','<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+'],
        ['DP04_0080','<$50k','$50k-100k','$100k-150k', '$150k-200k', '$200k-300k','$300k-500k', '$500k-1mm','$1mm+'],
        ['DP03_0004','Employed','Unemployed','Armed Forces', 'Not in Labor Force'],
        ['DP05_0072','White','African American','Latino', 'Asian', 'Native Hawaiian and Other Pacific Islander', 'American Indian/Alaskan Native', 'Some Other Race']
    ];

    $scope.labels = ['Age', 'Education', 'Income', 'Home Prices', 'Employment', 'Ethnicity'];

    getNatInfo = function (url) {
        var parameters = {category: $scope.category};
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
        $scope.title = getTitle($scope.chartKeys,$scope.labels, $scope.category);
        httpFactory.get(url, {params: parameters})
        .then(function(response){
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
            console.log(results, 'personal income results')
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

    $scope.getNationalData = function () {
        getNatInfo('/query/census/national');
      };

    $scope.getStateData = function () {
        $scope.query = {};
        $scope.dashboard = true;
        $scope.research = true;
        getStateInfo('/query/census/state');
        getBeaGDPData('/query/bea/gdp');
        getPersonalIncomeData('/query/bea/personal-income');
    };

      // $scope.addQuery = function(email, password) {
      //   $scope.message = "";
      //   var payload = {};
      //   payload.name = $scope.queryName;
      //   payload.category = $scope.category;
      //   payload.state = $scope.state_select;
      //   payload._id = JSON.parse(localStorage.getItem('currentUser'))._id;
      //   if(password) {
      //     payload.password = password;
      //   }
      //   $http.put('/auth/addQuery', payload)
      //     .success(function (data, status) {
      //     })
      //     .error(function (err) {
      //       console.log('handle error: ', err);
      //     });
      // };



      $scope.retrieve = function () {
        $scope.queries = JSON.parse(localStorage.getItem('currentUser')).queries;
      };

      $scope.run = function (name) {
        $scope.dashboard = true;
        $scope.research = true;
        $scope.index = findIndex(name ,$scope.queries);
        $scope.category = $scope.queries[$scope.index].category;
        $scope.state_select = $scope.queries[$scope.index].state;
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
