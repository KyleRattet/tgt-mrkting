app.directive('research', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

        ///helper function to format chart data
    function formatChartData (keys, values) {

      var valuesClean = values.shift();
      var keysClean = keys.shift();

      var data = [];
      for(var i=0; i<keysClean.length - 1; i++)  {
      data[i] = {};
      data[i].key = keysClean[i + 1];
      data[i].y = values[i];
      }
        return data;
    }

    //helper function to find keys for the pie chart
    function findKeys (keyArray, valueString) {
      var searchString = valueString.slice(0,9);

      var useKeys = [];
      for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i][0] === searchString) {
          useKeys.push(keyArray[i]);
        }
      }

      return useKeys;

    }

    //helper function to convert pie data into discrete bar chart data
    function convertToDiscreteBarData (array) {
        var results = [];
        var convert = array.map(function(obj) {
        results.push({
            label: obj.key,
            value: obj.y
        });
    });
        return results;
    }

    $scope.chartKeys = [
        ['DP05_0004','0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+'],
        ['DP02_0059','< 9th Grade','9th-12th No Diploma','High School Graduate', 'Some College, No Degree', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree'],
        ['DP03_0052','<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+']

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

        //use to build out query
        var parameters = {
          category: $scope.category,
          state: $scope.state_select
            };
        var state = $scope.state_select;
        var keys = findKeys($scope.chartKeys, $scope.category);
        httpFactory.get(url, {params: parameters})
        .then(function(response){


            $scope.stateData = response.data[1]

            $scope.stateData = formatChartData(keys ,$scope.stateData);
            console.log($scope.stateData, "pie chart for state data")

        });
      };

      // national api testing
      $scope.getNationalData = function () {
        getNatInfo('/query/census/national');
      };

      $scope.getStateData = function () {
        getStateInfo('/query/census/state');
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


