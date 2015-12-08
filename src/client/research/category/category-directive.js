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
          label: 'Education Attained',
          value:'DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0062PE,DP02_0063PE,DP02_0064PE,DP02_0065PE',
          chartKeys: ['<9th Grade','9th-12th','High School', 'Some College', 'Associates Degree', 'Bachelors Degree', 'Graduate Degree']
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
          value:'DP05_0072PE,DP05_0073PE,DP05_0066PE,DP05_0075PE,DP05_0076PE,DP05_0074PE,DP05_0077PE',
          chartKeys: ['White','African American','Latino', 'Asian', 'Hawaiian/Pacific Islander', 'American Indian', 'Some Other Race']
         },
         {
          label: 'Commuting Style',
          value:'DP03_0019PE,DP03_0020PE,DP03_0021PE,DP03_0022PE,DP03_0024PE,DP03_0023PE',
          chartKeys: ['Drive Alone','Carpool','Public Transport', 'Walk', 'Work From Home', 'Other']
         },
         {
          label: 'Language Spoken at Home',
          value:'DP02_0111PE,DP02_0112PE',
          chartKeys: ['English Only', 'Other']
         },
         {
          label: 'Rent Cost (Monthly)',
          value:'DP04_0125PE,DP04_0126PE,DP04_0127PE,DP04_0128PE,DP04_0129PE,DP04_0130PE,DP04_0131PE',
          chartKeys: ['<$200', '$200-$299', '$300-$499', '$500-$749', '$750-$999', '$1000-$1499', '>$1500']
         },
         {
          label: 'Place of Birth',
          value:'DP02_0089PE,DP02_0090PE,DP02_0092PE,DP02_0091PE',
          chartKeys: ['In State', 'Out of State', 'Foreign Born', 'Other']
         },
         {
          label: 'Vehicles Available (Household)',
          value:'DP04_0057PE,DP04_0058PE,DP04_0059PE,DP04_0060PE',
          chartKeys: ['Zero', 'One', 'Two', 'Three Or More']
         },
         {
          label: 'Education Enrollment (Age 3+)',
          value:'DP02_0053PE,DP02_0054PE,DP02_0055PE,DP02_0056PE,DP02_0057PE',
          chartKeys: ['Preschool', 'Kindergarten', 'Grades 1-8', 'High School', 'College or Graduate']
         },
         {
          label: 'Marital Status - Female',
          value:'DP02_0031PE,DP02_0032PE,DP02_0033PE,DP02_0035PE,DP02_0034PE',
          chartKeys: ['Never Married', 'Now Married', 'Seperated', 'Divroced', 'Widowed']
         },
         {
          label: 'Marital Status - Male',
          value:'DP02_0025PE,DP02_0026PE,DP02_0027PE,DP02_0029PE,DP02_0028PE',
          chartKeys: ['Never Married', 'Now Married', 'Seperated', 'Divroced', 'Widowed']
         },
         {
          label: 'Housing - Year Built',
          value:'DP04_0025PE,DP04_0024PE,DP04_0023PE,DP04_0022PE,DP04_0021PE,DP04_0020PE,DP04_0019PE,DP04_0018PE,DP04_0017PE',
          chartKeys: ['1939 or Earlier', '1940-1949', '1950-1959', '1960-1969', '1970-1979', '1980-1989', '1990-1999', '2000-2009','2010 or Later']
         },
         {
          label: 'Housing - Year Moved Into',
          value:'DP04_0050PE,DP04_0051PE,DP04_0052PE,DP04_0053PE,DP04_0054PE,DP04_0055PE',
          chartKeys: ['2010 or Later', '2000-2009', '1990-1999', '1980-1989', '1970-1979', '1969 or Earlier']
         },
         {
          label: 'Housing - Heating Fuel',
          value:'DP04_0062PE,DP04_0063PE,DP04_0064PE,DP04_0065PE,DP04_0066PE,DP04_0067PE,DP04_0068PE,DP04_0069PE,DP04_0070PE',
          chartKeys: ['Utility Gas', 'Tank LP Gas', 'Electricity', 'Fuel Oil', 'Coal', 'Wood', 'Solar', 'Other Fuel', 'No Fuel Used']
         },
         {
          label: 'Housing - With or Without A Mortgage',
          value:'DP04_0091PE,DP04_0090PE',
          chartKeys: ['Without a Mortgage', 'With a Mortgage']
         },
         {
          label: 'Housing - Monthly Mortgage',
          value:'DP04_0093PE,DP04_0094PE,DP04_0095PE,DP04_0096PE,DP04_0097PE,DP04_0098PE,DP04_0099PE',
          chartKeys: ['Less than $300', '$300-$499', '$500-$699', '$700-$999','$1000-$1499','$1500-$1999', '$2000 or More']
         }
      ];
    },
    templateUrl: 'research/category/category-html.html'
  };
});
