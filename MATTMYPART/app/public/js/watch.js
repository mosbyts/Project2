/* global moment */
//watch will be watch
//watchs will be watchlist
// When user clicks add-btn
$("#watch-submit").on("click", function(event) {
  event.preventDefault();

  // Make a newWatch object
  var newWatch = {
    title: $("#title").val().trim(),
    body: $("#watch-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newWatch);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newWatch)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("watch");

      row.append("<p>You want to watch" + newWatch.title + "</p>");
      row.append("<p>Comments about Movie: " + newWatch.body + "</p>");
      row.append("<p>Added " + moment(newWatch.created_at).format("h:mma on dddd") + "</p>");

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
      row.append("<p>" + data[i].body + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

      $("#watch-area").prepend(row);

    }

  }

});
