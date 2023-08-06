const express = require("express");

const { getMovieTheater } = require("../controllers/movieController");

const router = express.Router();

// router.get("/:name", getTheater);
router.get("/:name", getMovieTheater);

module.exports = router;
