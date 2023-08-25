const express = require("express");

const {
  getAllReview,
  createReview,
} = require("../controllers/reviewController");

const router = express.Router();

// router.get("/:name", getTheater);
router.route("/").get(getAllReview).post(createReview);

module.exports = router;
