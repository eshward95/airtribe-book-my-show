const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie_noSql = require("./../models/movie_mongo");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true
    // useFindAndModify: false
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const movies = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Movie_noSql.create(movies);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Movie_noSql.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
