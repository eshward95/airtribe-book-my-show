const express = require("express"); //
require("dotenv").config();
const cors = require("cors"); //
const theaterRouter = require("./src/routes/theaterRoute");
const movieRouter = require("./src/routes/movieRoute");
const reviewRouter = require("./src/routes/reviewRoutes");
const globalErrorHandler = require("./src/controllers/errorController");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/theater", theaterRouter);
app.use("/movie", movieRouter);
app.use("/review", reviewRouter);

app.all("*", (req, res, next) => {
  res.status(200).json({ message: "Welcome to Book my show" });
});

app.use(globalErrorHandler);

module.exports = app;
