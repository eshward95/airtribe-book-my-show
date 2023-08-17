const { Op } = require("sequelize");
const CustomError = require("../helpers/CustomError");
const { db } = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const Movie_noSql = require("../models/movie_mongo");
const ApiFeatures = require("../helpers/ApiFeatures");

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
  const movies = await movieQuery.query;

  res.status(200).json({
    status: "success",
    results: movies.length,
    data: { movies },
  });
});
module.exports = { getMovieTheater, getAllMovies };
