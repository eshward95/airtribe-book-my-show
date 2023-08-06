const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Seat = sequelize.define(
    "Seat",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //Adding same seat number to theater Validation
          async isUniqueForTheater(value) {
            const existingSeat = await Seat.findOne({
              where: {
                theaterId: this.TheaterId,
                number: value,
              },
            });
            if (existingSeat) {
              throw new Error(
                `Seat number '${value}' already exists for this theater.`
              );
            }
          },
        },
      },
    },
    { tableName: "seat" }
  );
  return Seat;
};
