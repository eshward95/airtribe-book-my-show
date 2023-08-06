const { Op } = require("sequelize");
const CustomError = require("../helpers/CustomError");
const { db } = require("../models/index");
const catchAsync = require("../utils/catchAsync");

const Theater = db.theater;
const City = db.city;
const Show = db.show;
const Movie = db.movie;
const Seat = db.seat;

const getShow = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  const theater = await Theater.findOne({
    where: {
      [Op.or]: [{ name: name.toLowerCase() }, { id: name }],
    },
  });
  // console.log(theater);
  if (!theater) {
    return next(new CustomError("No Theater data found", 400));
  }
  const theaterQuery = Theater.findByPk(theater.id, {
    include: {
      model: Show,
      include: [Movie],
      // include: [City],
    },
  });
  await theaterQuery
    .then((success) => {
      if (success.get("Shows").length > 0) {
        res.status(200).json({ result: "success", data: success.get("Shows") });
      } else {
        res.status(200).json({ result: "success", data: "No shows available" });
      }
    })
    .catch((error) => res.status(404).json(error));
});

const getTheater = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  const city = await City.findOne({ where: { name: name.toLowerCase() } });
  // console.log(cityId);
  if (!city) {
    return next(new CustomError("No city data found", 400));
  }
  const theater = City.findByPk(city.id, {
    include: {
      model: Theater,
    },
  });
  await theater
    .then((success) => {
      res.status(200).json(success.get("Theaters"));
    })
    .catch((error) => res.status(404).json(error));
});

const getSeat = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  const theaterQuery = await Theater.findOne({
    where: {
      [Op.or]: [{ name: name.toLowerCase() }, { id: name }],
    },
  });
  if (!theaterQuery) {
    return next(new CustomError("No Theater data found", 400));
  }
  const seat = Seat.findAll({
    where: { TheaterId: theaterQuery.id },
    include: [
      {
        model: Theater,
        attributes: ["name"],
      },
    ],
  });
  await seat
    .then((success) => {
      res.status(200).json(success);
    })
    .catch((error) => res.status(404).json(error));
});

const addProduct = catchAsync(async (req, res) => {
  const { title, price, description, published, email } = req.body;
  let info = {
    title,
    price,
    description,
    published,
    email,
  };
  //   const product = await Product.save(info);
  const product = Product.build(info);
  // return product.validate();
  // product.validate();
  product
    .save()
    .then((success) => {
      res.status(201).json(success);
    })
    .catch((err) => {
      res.json(err);
    });
});

const getProducts = catchAsync(async (req, res) => {
  let products = await Product.findAll({
    // attributes: ["title"],
    // attributes: ["title", "description", "aboutProduct"],
  });
  res.status(200).json(products);
});
const getProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = Product.findOne({
    where: { id: id },
    attributes: { exclude: ["aboutProduct"] },
  });
  await product
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(404).json(error));
});
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = Product.update(req.body, { where: { id: id } });
  await product
    .then((success) => {
      console.log(product);
      res.status(200).json(success);
    })
    .catch((error) => res.status(404).json(error));
});
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id: id } })
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(404).json(error));
});

const getPublishedProduct = async (_, res) => {
  const product = Product.findAll({ where: { published: true } });
  await product
    .then((success) => res.status(200).json(success))
    .catch((error) => res.status(404).json(error));
};

module.exports = {
  // deleteProduct,
  // updateProduct,
  // getProduct,
  // getPublishedProduct,
  // getProducts,
  // addProduct,
  getTheater,
  getShow,
  getSeat,
};
