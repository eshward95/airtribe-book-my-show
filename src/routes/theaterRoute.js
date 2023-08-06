const express = require("express");

const {
  getTheater,
  getShow,
  getSeat,
} = require("../controllers/theaterController");

const router = express.Router();

router.get("/:name", getTheater);
router.get("/:name/show", getShow);
router.get("/:name/seat", getSeat);

module.exports = router;
