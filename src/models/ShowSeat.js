const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShowSeat = sequelize.define(
    "show_seat",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      isBooked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { tableName: "show_seat" }
  );
  return ShowSeat;
};
