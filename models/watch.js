// Dependencies
// =============================================================

/* This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Watch" model that matches up with DB
var Watch = sequelize.define("watch", {
  title:  Sequelize.STRING,
  body: Sequelize.STRING,
  created_at: Sequelize.DATE
});

// Syncs with DB
Watch.sync();

// Makes the Watch Model available for other files (will also create a table)
module.exports = Watch;
*/
module.exports = function(sequelize, DataTypes) {
  var Watch = sequelize.define("Watch", {
    title: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE
    },
  });

  return Watch;
}
