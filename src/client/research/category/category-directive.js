app.directive('categoryData', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $rootScope, $http, $window, httpFactory) {

      $scope.categories = [
        {
          label: 'Age',
          value:'DP05_0004PE,DP05_0005PE,DP05_0006PE,DP05_0007PE,DP05_0008PE,DP05_0009PE,DP05_0010PE,DP05_0011PE,DP05_0012PE,DP05_0013PE,DP05_0014PE,DP05_0015PE,DP05_0016PE,DP05_0001PE',
          chartKeys: ['0-5','5-9','10-14', '15-19', '20-24', '25-34', '35-44', '45-54', '55-59', '60-64', '65-74', '75-84', '85+']
         },
         {
          label: 'Education',
          value:'DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0062PE,DP02_0063PE,DP02_0064PE,DP02_0065PE',
          chartKeys: ['< 9th Grade','9th-12th No Diploma','High School Graduate', 'Some College, No Degree', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree']
         },
         {
          label: 'Income',
          value:'DP03_0052PE,DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE,DP03_0051PE',
          chartKeys: ['<$10k','$15k-$25k','$25k-$35k', '$35k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k','$150k-$200k', '$200k+']
         },
         {
          label: 'Home Prices',
          value:'DP04_0080PE,DP04_0081PE,DP04_0082PE,DP04_0083PE,DP04_0084PE,DP04_0085PE,DP04_0086PE,DP04_0087PE',
          chartKeys: ['<$50k','$50k-100k','$100k-150k', '$150k-200k', '$200k-300k', '$300k-500k', '$500k-1mm','$1mm+']
         },
         {
          label: 'Employment',
          value:'DP03_0004PE,DP03_0005PE,DP03_0006PE,DP03_0007PE,DP03_0008PE',
          chartKeys: ['Employed','Unemployed','Armed Forces', 'Not in Labor Force']
         },
         {
          label: 'Ethnicity',
          value:'DP05_0032PE,DP05_0033PE,DP05_0034PE,DP05_0047PE,DP05_0039PE,DP05_0052PE,DP05_0053PE',
          chartKeys: ['White','African American','American Indian/Alaska Native', 'Native Hawaiian/Pacific Islander', 'Asian', 'Other', 'Two or More Races']
         }
      ];
    },
    templateUrl: 'research/category/category-html.html'
  };
});
