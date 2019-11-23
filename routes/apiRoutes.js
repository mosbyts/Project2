// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var Watch = require("../models/watch.js");

// Routes
// =============================================================

//Movie review post API call start
module.exports = function(app) {
  // GET route for getting all of the reviews
  app.get("/api/posts/", function(req, res) {
    db.Review.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for returning reviews of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    db.Review.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single review
  app.get("/api/posts/:id", function(req, res) {
    db.Review.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new review
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Review.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting reviews
  app.delete("/api/posts/:id", function(req, res) {
    db.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating reviews
  app.put("/api/posts", function(req, res) {
    db.Review.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
//Movie review post API call end


//Movie watch list API call start
// =============================================================
module.exports = function(app) {

  // Get all watchs
  app.get("/api/all", function(req, res) {

    // Finding all watchs, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    Watch.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });

  });

  // Add a watch
  app.post("/api/new", function(req, res) {
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
//Movie watch list API call end