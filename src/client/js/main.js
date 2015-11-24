// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});


//format chart key values
function formatChartData (keys, values) {
  var arrayOfObjects = [];

  for (var i = 0; i < keys.length; i++) {
    arrayOfObjects[keys[i]] = values[i];
  }

  return arrayOfObjects;

}


///find right keys to use
function findKeys (keyArray, valueString) {
  var searchString = valueString.slice(0,9);
  var useKeys = [];
  for (var i = 0; i < keyArray.length; i++) {
    if (keyArray[i] === searchString) {
      useKeys.push(keyArray[i])
    }
  }

  return useKeys;

}
