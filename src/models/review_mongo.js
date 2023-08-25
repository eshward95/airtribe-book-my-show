const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating cannot be empty"],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: "movie",
      required: [true, "Movie id is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
