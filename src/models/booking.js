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
      },
      bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        get() {
          const date = new Date(this.getDataValue("bookingDate"));
          if (date) {
            const options = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            };
            return date.toLocaleDateString("en-GB", options);
          }
          return null;
        },
      },
    },
    { tableName: "booking" }
  );
  return City;
};
