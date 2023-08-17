const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Movie must have a name"],
    unique: true,
    trim: true,
  },
  //   duration: {
  //     type: Number,
  //     required: [true, 'A Movie must have a duration']
  //   },
  crew: {
    type: [String],
  },
  runtime: {
    type: String,
    required: [true, "A Movie must have a runtime"],
  },
  rating: {
    type: String,
  },
  releaseDate: {
    type: String,
    required: [true, "A tour must have a release date"],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  language: {
    type: [String],
  },
  genre: {
    type: [String],
  },
  //   difficulty: {
  //     type: String,
  //     required: [true, 'A tour must have a difficulty']
  //   },
  //   ratingsAverage: { type: Number, default: 4.5 },
  //   ratingsQuality: { type: Number, default: 0 },
  //   price: { type: Number, required: [true, 'A tour must have a price'] },
  //   priceDiscount: { type: Number },
  //   summary: {
  //     type: String,
  //     trim: true,
  //     required: [true, 'A tour must have a summary']
  //   },
  //   startDate: [Date]
});
const Movie_noSql = mongoose.model("movie", movieSchema);

module.exports = Movie_noSql;
