const router = require("express").Router();
const {
  GET_NINJAS,
  POST_NINJAS,
  UPDATE_NINJA,
  DELETE_NINJA
} = require("../controllers/ninjas");

router
  .route("/")
  .get(GET_NINJAS)
  .post(POST_NINJAS);

router
  .route("/:id")
  .put(UPDATE_NINJA)
  .delete(DELETE_NINJA);

module.exports = router;
