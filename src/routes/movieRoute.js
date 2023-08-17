const express = require("express");

const {
  getMovieTheater,
  getAllMovies,
} = require("../controllers/movieController");

const router = express.Router();

// router.get("/:name", getTheater);
router.get("/:name", getMovieTheater);
router.get("/", getAllMovies);

module.exports = router;
