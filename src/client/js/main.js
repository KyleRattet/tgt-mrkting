// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});


//format chart key values
// function formatChartData (keys, values) {
//   var arrayOfObjects = [];

//   for (var i = 0; i < keys.length; i++) {
//     arrayOfObjects[keys[i]] = values[i];
//   }

//   return arrayOfObjects;

// }


// ///find right keys to use
// function findKeys (keyArray, valueString) {
//   var searchString = valueString.slice(0,9);
//   var useKeys = [];
//   for (var i = 0; i < keyArray.length; i++) {
//     if (keyArray[i] === searchString) {
//       useKeys.push(keyArray[i])
//     }
//   }

//   return useKeys;

// }


var test = [
  {CL_UNIT: "USD",
  Code: "GDP_SP",
DataValue: "199440",
GeoFips: "01000",
GeoName: "Alabama",
TimePeriod: "2014",
UNIT_MULT: "6"},
  {CL_UNIT: "USD",
Code: "GDP_SP",
DataValue: "57080",
GeoFips: "02000",
GeoName: "Alaska",
TimePeriod: "2014",
UNIT_MULT: "6"
  },
  {
    CL_UNIT: "USD",
Code: "GDP_SP",
DataValue: "284156",
GeoFips: "04000",
GeoName: "Arizona",
TimePeriod: "2014",
UNIT_MULT: "6"
},
{
  CL_UNIT: "USD",
Code: "GDP_SP",
DataValue: "121395",
GeoFips: "05000",
GeoName: "Arkansas",
TimePeriod: "2014",
UNIT_MULT: "6",

}


];

// function dynamicSort (a,b,property) {
//    return a[property] - b[property];
// }

var sorted = test.sort(function(a, b, property) {
    return a[property] - b[property];
});
function sorted (array, a, b, property) {
  array.sort(function(a, b, property) {
    return a[property] - b[property];
    });
}



