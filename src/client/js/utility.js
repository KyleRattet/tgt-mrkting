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
      console.log(searchString, 'searchstring');

      var useKeys = [];
      for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i][0] === searchString) {
          useKeys.push(keyArray[i]);
        }
      }

      return useKeys;

    }

    //helper function for category labels
    function getTitle (keyArray,labelArray,valueString) {
      var searchString = valueString.slice(0,9);
      var results = '';

      for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i][0] === searchString) {
          results = labelArray[i];
        }
      }
      return results;
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

    // helper function to clean BEA data
    function cleanArray(array) {
        var clean =[];
        for (var i = 0; i<array.length; i++) {
            if (array[i].GeoName != 'United States' && array[i].GeoName != 'Plains'
                && array[i].GeoName != 'Southeast' && array[i].GeoName != 'Far West' && array[i].GeoName != 'Mideast' && array[i].GeoName != 'Great Lakes' && array[i].GeoName != 'Southwest' && array[i].GeoName != 'New England' && array[i].GeoName != 'Rocky Mountain' && array[i][0] !== 'NAME') {
                clean.push(array[i]);
            }
        }
      return clean;
    }

    //helpful function to get top 10 lists
    function getTopTen (array) {
        var results = [];
        for (var i = 0; i < 10; i++) {
            results.push(array[i]);
        }

        return results;
    }

//     //find index of for saved queries
//     function findIndex (name, array) {
//       var index = '';

//       for (var i = 0; i < array.length; i++) {
//         if (array[i].name === name) {
//           index = i;
//         }
//       }
//       return index;
//     }

// var test = [
//   {_id: "565ddfd810a5bcb2c14661f7",
//     category: "DP05_0072PE,DP05_0073PE,DP05_0066PE,DP05_0075PE,DP05_0076PE,DP05_0074PE,DP05_0077PE",
//     name: "Ethnicity for Colorado",
//     state: "08"},
//   {_id: "565ddadddb98e7b3b8f8b387",
//     category: "DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0062PE,DP02_0063PE,DP02_0064PE,DP02_0065PE",
//     name: "Education for the state of california",
//     state: "06"}
// ];




