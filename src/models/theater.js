const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Theater = sequelize.define(
    "Theater",
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
      },
    },
    { tableName: "Theater" }
  );
  return Theater;
};
