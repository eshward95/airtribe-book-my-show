const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Movie = sequelize.define(
    "Movie",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "movie" }
  );
  return Movie;
};
