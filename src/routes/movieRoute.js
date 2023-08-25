const express = require("express");

const {
  getMovieTheater,
  getAllMovies,
  getMovie,
  createIndex,
  searchMovies,
} = require("../controllers/movieController");

const router = express.Router();

// router.get("/:name", getTheater);
router.get("/_search", searchMovies);
router.get("/:id", getMovie);
router.get("/:name", getMovieTheater);
router.get("/", getAllMovies);
router.get("/index/bulk", createIndex);

module.exports = router;
