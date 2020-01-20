const Ninja = require("../models/ninjas");

const GET_NINJAS = async (req, res, next) => {
  const point = {
    type: "Point",
    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
  };
  try {
    const ninjas = await Ninja.aggregate([
      {
        $geoNear: {
          near: point,
          distanceField: "dist.calculated",
          maxDistance: 100000,
          spherical: true
        }
      }
    ]);
    return res.json({
      count: ninjas.length,
      ninjas,
      request: { url: "http://localhost:3000/ninjas", method: "GET" }
    });
  } catch (error) {
    next(error);
  }
};

const POST_NINJAS = async (req, res, next) => {
  try {
    const ninja = await Ninja.create(req.body);
    return res.json({
      success: true,
      ninja,
      request: { url: "http://localhost:3000/ninjas", method: "POST" }
    });
  } catch (error) {
    next(error);
  }
};

const UPDATE_NINJA = async (req, res, next) => {
  try {
    const ninja = await Ninja.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json({
      success: true,
      ninja,
      request: {
        url: `http://localhost:3000/ninjas/${req.params.id}`,
        method: "PUT"
      }
    });
  } catch (error) {
    next(error);
  }
};

const DELETE_NINJA = async (req, res, next) => {
  try {
    await Ninja.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      success: true,
      request: {
        url: `http://localhost:3000/ninjas/${req.params.id}`,
        method: "DELETE"
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GET_NINJAS,
  POST_NINJAS,
  UPDATE_NINJA,
  DELETE_NINJA
};
