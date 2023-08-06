const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Show = sequelize.define(
    "Show",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    { tableName: "shows" }
  );
  return Show;
};
