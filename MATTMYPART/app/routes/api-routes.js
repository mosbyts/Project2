// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Watch = require("../models/watch.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Get all watchs
  app.get("/api/all", function(req, res) {

    // Finding all watchs, and then returning them to the user as JSON.
    // Sequeliize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    Watch.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });

  });

  // Add a watch
  app.post("/api/new", function(req, res) {

    console.log("Watch Data:");
    console.log(req.body);

    Watch.create({
      title: req.body.title,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function(results) {
      // `results` here would be the newly created Watch
      res.end();
    });

  });

};