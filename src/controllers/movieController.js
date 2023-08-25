const { Op } = require("sequelize");
const CustomError = require("../helpers/CustomError");
const { db } = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const Movie_noSql = require("../models/movie_mongo");
const ApiFeatures = require("../helpers/ApiFeatures");
const { createBulkMovieIndex } = require("../utils/createBulkIndex");
const { ESClient } = require("../config/elasticsearch");

const Theater = db.theater;
const City = db.city;
const Show = db.show;
const Movie = db.movie;

const getMovieTheater = catchAsync(async (req, res, next) => {
  // console.log("Movie_noSql", await Movie_noSql.find());
  const { name } = req.params;
  const { city } = req.query;
  const cityQuery = await City.findOne({
    where: {
      [Op.or]: [{ name: city?.toLowerCase() || "" }, { id: city || "" }],
    },
  });
  const whereCondition = {
    id: {
      [Op.not]: null,
    },
  };

  if (cityQuery?.id) {
    whereCondition.CityId = cityQuery.id;
  }
  const movieQuery = Show.findAll({
    where: {
      MovieId: name,
    },
    include: [
      {
        model: Movie,
        attributes: ["id", "name", "duration"],
      },
      {
        model: Theater,
        attributes: ["id", "name"],
        where: whereCondition,
      },
    ],
  });
  await movieQuery
    .then((success) => {
      return res.status(200).json({ result: "success", data: success });
    })
    .catch((error) => res.status(404).json(error));
});
const getAllMovies = catchAsync(async (req, res, next) => {
  const movieQuery = new ApiFeatures(Movie_noSql.find(), req.query)
    .filter()
    .sort()
    .limit()
    .pagination();
  const movies = await movieQuery.query.lean();

  res.status(200).json({
    status: "success",
    results: movies.length,
    data: { movies },
  });
});
const getMovie = catchAsync(async (req, res, next) => {
  const movieQuery = await Movie_noSql.findById(req.params.id)
    .populate({
      path: "reviews",
      select: "rating -movie review createdAt",
    })
    .lean();
  res.status(200).json({
    status: "success",
    results: movieQuery.length,
    data: { movieQuery },
  });
});

const createIndex = catchAsync(async (req, res, next) => {
  try {
    createBulkMovieIndex();
    res.status(201).json({ message: "Index successfully created." });
  } catch (error) {
    console.error("Error getting index:", error);
    res.status(400).json(error);
  }
});
const searchMovies = catchAsync(async (req, res, next) => {
  try {
    const result = await ESClient.search({
      index: "movie_data",
      body: {
        query: {
          multi_match: {
            query: req.query.q,
            fields: ["name", "rating", "crew", "language", "genre"],
            type: "cross_fields",
          },
        },
        min_score: 0.8,
      },
    });
    res.status(200).json({
      status: "Success",
      result: result.hits.hits.length,
      data: result.hits.hits,
    });
  } catch (error) {
    console.error("Error getting index:", error);
    res.status(400).json(error);
  }
});
module.exports = {
  getMovieTheater,
  getAllMovies,
  getMovie,
  createIndex,
  searchMovies,
};
