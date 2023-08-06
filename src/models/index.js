const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to db");
  }
};
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.products = require("./products.js")(sequelize, DataTypes);
db.city = require("./city")(sequelize);
db.theater = require("./theater")(sequelize);
db.movie = require("./movie")(sequelize);
db.show = require("./show")(sequelize);
db.seat = require("./seat")(sequelize);

// Associations
db.city.hasMany(db.theater);
db.theater.belongsTo(db.city);

db.theater.hasMany(db.show);
db.show.belongsTo(db.theater, {
  //   foreignKey: "theaterId",
  //   otherKey: "movieId",
});

db.movie.hasMany(db.show);
db.show.belongsTo(db.movie, {
  //   foreignKey: "movieId",
  //   otherKey: "theaterId",
});

db.theater.hasMany(db.seat);
db.seat.belongsTo(db.theater, {
  //   foreignKey: "movieId",
  //   otherKey: "theaterId",
});
const shows = db.show;

let movie = db.movie;
let theater;

db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Sync DB");
    // return db.theater.destroy({ where: { name: "Innovative delete" } });
    // return db.theater.findByPk("aacd08d3-8b38-40ec-8610-ba6fa5bef4d4");
  })
  //   .then((data) => {
  //     //     console.log(data.toJSON());
  //     theater = data;
  //     const seats = [
  //       { TheaterId: theater.id, number: "G1" },
  //       { TheaterId: theater.id, number: "G2" },
  //       { TheaterId: theater.id, number: "G3" },
  //       // Add more seat objects as needed
  //     ];

  //     db.seat.bulkCreate(seats, { validate: true, individualHooks: true });
  //     return db.movie.findOne({ where: { name: "Hostel hudagaru" } });
  //   })
  //   .then((data) => {
  //     console.log("here", data);
  //     movie = data;
  //     console.log(theater);
  //     db.show.bulkCreate([
  //       {
  //         time: "10:15",
  //         TheaterId: theater.id, // ID of the theater
  //         MovieId: movie.id, // ID of the movie
  //       },
  //     ]);
  //   })
  .catch((err) => {
    console.log("Error while sync", err);
  });
module.exports = { connectToDb, db };
