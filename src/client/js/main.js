// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});
