module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
  var Review = sequelize.define("Review", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Netflix"
    }
  });
  return Post;
};
  return Review;
};
