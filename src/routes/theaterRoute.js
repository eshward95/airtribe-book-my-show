const express = require("express");

const {
  getTheater,
  getShow,
  bookTicket,
  getSeat,
  //   getMovie,
} = require("../controllers/theaterController");

const router = express.Router();
//Get theater details
router.get("/:name", getTheater);
//Get shows in theater
router.get("/:name/show", getShow);
//Get movie in details
router.get("/:name/movie", getShow);
// router.get("/:name/seat", getSeat);
router.post("/:name/:show_time_id/book", bookTicket);

module.exports = router;
