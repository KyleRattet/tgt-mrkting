app.directive('research', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

        ///helpful function to format chart data
    function formatChartData (keys, values) {
      var data = [];
      for(var i=0; i<keys.length; i++)  {
      data[i] = {};
      data[i].key = keys[i];
      data[i].y = values[i];
      }
        return data;
    }

    getNatInfo = function (url) {

    var parameters = {
      category: $scope.category
        };
    console.log(parameters, "params");
    var state = $scope.state_select;

    ///stopping point

    var keys = $scope.category.chartKeys;
    console.log(keys, "category keys");
    httpFactory.get(url, {params: parameters})
    .then(function(response){
        $scope.usData = response.data[1]
        console.log($scope.usData, "us data response");
        $scope.Data = formatChartData(keys ,$scope.usData);
        // $scope.Data = [
        //     {
        //         key: "0-5",
        //         y: $scope.usData[1]
        //     },
        //     {
        //         key: "5-9",
        //         y: $scope.usData[2]
        //     },
        //     {
        //         key: "10-14",
        //         y: $scope.usData[3]
        //     },
        //     {
        //         key: "15-19",
        //         y: $scope.usData[4]
        //     },
        //     {
        //         key: "20-24",
        //         y: $scope.usData[5]
        //     },
        //     {
        //         key: "25-34",
        //         y: $scope.usData[6]
        //     },
        //     {
        //         key: "35-44",
        //         y: $scope.usData[7]
        //     },
        //     {
        //         key: "45-54",
        //         y: $scope.usData[8]
        //     },
        //     {
        //         key: "55-59",
        //         y: $scope.usData[9]
        //     },
        //     {
        //         key: "60-64",
        //         y: $scope.usData[10]
        //     },
        //     {
        //         key: "65-74",
        //         y: $scope.usData[11]
        //     },
        //     {
        //         key: "75-84",
        //         y: $scope.usData[12]
        //     },
        //     {
        //         key: "85+",
        //         y: $scope.usData[13]
        //     }
        // ];

    //     $scope.dataDiscreteBar = [
    //         {
    //             key: "Cumulative Return",
    //             values: [
    //                 {
    //                     "label" : "0-5" ,
    //                     "value" : $scope.usData[1]
    //                 } ,
    //                 {
    //                     "label" : "5-9" ,
    //                     "value" : $scope.usData[2]
    //                 } ,
    //                 {
    //                     "label" : "10-14" ,
    //                     "value" : $scope.usData[3]
    //                 } ,
    //                 {
    //                     "label" : '15-19' ,
    //                     "value" : $scope.usData[4]
    //                 } ,
    //                 {
    //                     "label" : "20-24" ,
    //                     "value" : $scope.usData[5]
    //                 } ,
    //                 {
    //                     "label" : "35-44" ,
    //                     "value" : $scope.usData[6]
    //                 } ,
    //                 {
    //                     "label" : "45-54" ,
    //                     "value" : $scope.usData[7]
    //                 } ,
    //                 {
    //                     "label" : "60-64" ,
    //                     "value" : $scope.usData[8]
    //                 } ,
    //                 {
    //                     "label" : "65-74" ,
    //                     "value" : $scope.usData[9]
    //                 } ,
    //                 {
    //                     "label" : "75-84" ,
    //                     "value" : $scope.usData[10]
    //                 } ,
    //                 {
    //                     "label" : "85+" ,
    //                     "value" : $scope.usData[11]
    //                 }
    //             ]
    //         }
    //     ]
        });
      };

      getStateInfo = function (url) {

        //use to build out query
        var parameters = {
          category: $scope.category,
          state: $scope.state_select
            };
        // var state = $scope.state_select;
        httpFactory.get(url, {params: parameters})
        .then(function(response){

            console.log(response, "state api info response");
            // $scope.stateData = response.data[1]
            // console.log($scope.stateData, "state data response")
            // $scope.statePieData = [
            //     {
            //         key: "0-5",
            //         y: $scope.stateData[1]
            //     },
            //     {
            //         key: "5-9",
            //         y: $scope.stateData[2]
            //     },
            //     {
            //         key: "10-14",
            //         y: $scope.stateData[3]
            //     },
            //     {
            //         key: "15-19",
            //         y: $scope.stateData[4]
            //     },
            //     {
            //         key: "20-24",
            //         y: $scope.stateData[5]
            //     },
            //     {
            //         key: "25-34",
            //         y: $scope.stateData[6]
            //     },
            //     {
            //         key: "35-44",
            //         y: $scope.stateData[7]
            //     },
            //     {
            //         key: "45-54",
            //         y: $scope.stateData[8]
            //     },
            //     {
            //         key: "55-59",
            //         y: $scope.stateData[9]
            //     },
            //     {
            //         key: "60-64",
            //         y: $scope.stateData[10]
            //     },
            //     {
            //         key: "65-74",
            //         y: $scope.stateData[11]
            //     },
            //     {
            //         key: "75-84",
            //         y: $scope.stateData[12]
            //     },
            //     {
            //         key: "85+",
            //         y: $scope.stateData[13]
            //     }
            // ];
        });
      };

      // national api testing
      $scope.getNationalData = function () {
        getNatInfo('/query/census/national');
      };

      // $scope.getStateData = function () {
      //   getStateInfo('/query/census/state');
      // };
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


