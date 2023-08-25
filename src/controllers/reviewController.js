const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/review_mongo");

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  //   const reviews = await Review.find();

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
