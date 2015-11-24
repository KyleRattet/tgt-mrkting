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


