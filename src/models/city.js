const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const City = sequelize.define(
    "City",
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
    },
    { tableName: "City" }
  );
  return City;
};
