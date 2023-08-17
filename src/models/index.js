const dbConfig = require("../config/dbConfig");
const mongoose = require("mongoose");

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
const connectToMongo = async () => {
  const DB = process.env.DATABASE_LOCAL;

  //Connect for depreciation
  mongoose
    .connect(process.env.DATABASE_LOCAL || DB, {
      useNewUrlParser: true,
      // useFindAndMo dify: false
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo connection successfully"))
    .catch((err) => console.log(err));
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
db.showSeat = require("./ShowSeat")(sequelize);
db.booking = require("./booking")(sequelize);
console.log("object", db.showSeat);

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

// db.show.hasMany(db.seat);
// db.seat.belongsTo(db.show, {
//   //   foreignKey: "movieId",
//   //   otherKey: "theaterId",
// });

const shows = db.show;
const seats = db.seat;

shows.belongsToMany(seats, { through: db.showSeat });
seats.belongsToMany(shows, { through: db.showSeat });

db.showSeat.belongsTo(shows);
db.showSeat.belongsTo(seats);

shows.belongsToMany(seats, { through: db.booking });
seats.belongsToMany(shows, { through: db.booking });

db.booking.belongsTo(shows);
db.booking.belongsTo(seats);

let movie = db.movie;
let theater;

db.sequelize
  .sync({ alter: false })
  .then(() => {
    // db.booking.create({ name: "test", bookingDate: "2023-08-14" });

    console.log("Sync DB");
    // const showInstance = db.show.findByPk(
    //   "a14d2f8f-6377-44e7-bfc7-aa9e511d4d9c"
    // );
    // const seatInstance = db.seat.findAll();
    // Promise.all([showInstance, seatInstance])
    //   .then(([show, seat]) => {
    //     console.log("object", seat);
    //     return show.addSeats(seat);
    //   })
    //   .then((data) => {
    //     console.log("Data", data);

    //     // Association added successfully
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Error occurred while adding association
    //   });
    // const seats = [
    //   {
    //     ShowId: "2fc21d84-0058-4442-a491-36f66d06cf8a",
    //     seatId: "a76a620f-d5ec-43c7-8753-474f22668a01",
    //   },
    //   {
    //     ShowId: "2fc21d84-0058-4442-a491-36f66d06cf8a",
    //     seatId: "eb3c6c9e-d90f-43be-8761-0d967b7469d4",
    //   },
    //   {
    //     ShowId: "2fc21d84-0058-4442-a491-36f66d06cf8a",
    //     seatId: "2396cc0d-4e98-4841-b3bd-efd175ba45f1",
    //   },
    //   // Add more seat objects as needed
    // ];
    // const seats = [{ number: "a3" }, { number: "a2" }, { number: "a1" }];

    return db.showSeat.bulkCreate(seats);
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
module.exports = { connectToDb, db, connectToMongo };
