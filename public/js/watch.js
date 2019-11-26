/* global moment */
//watch will be watch
//watchs will be watchlist
// When user clicks add-btn
$('[data-toggle="popover"]').popover();
//$('#watch-submit').popover({delay: { "show": 5000, "hide": 1000 }});

$("#watch-submit").on("click", function(event) {
  event.preventDefault();
  // Make a newWatch object
  var newWatch = {
    title: $("#title").val().trim(),
    body: $("#watch-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  $("#watch-submit").attr("data-content", "Movie added at " + moment(newWatch.created_a).format("h:mma MM-DD"));
  //$('[data-toggle="popover"]').popover();
  setTimeout(function() {
    $('#watch-submit').popover('hide');
  }, 3000);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newWatch)
    // On success, run the following code
    .then(function() {
      var row = $("<div>");
      row.addClass("watch");
      row.append("<p>You successfully put  " + newWatch.title + " on watchlist!</p>");
      row.append("<p>Because: " + newWatch.body + "</p>");
      row.append("<p>Added " + moment(newWatch.created_at).format("h:mma on dddd") + "</p>");
      row.append("<br>");
      $("#watch-area").prepend(row);
    });
  // Empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#watch-box").val("");
});

// When the page loads, grab all of our watchs
$.get("/api/all", function(data) {
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("watch");
      row.append("<p>Added: " + data[i].title + "</p>");
      row.append("<p>Why: " + data[i].body + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on MMM Do YYYY") + "</p>");
      row.append("<br>");
      $("#watch-area").prepend(row);
    }
  }
});
