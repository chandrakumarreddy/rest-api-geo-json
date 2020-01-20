const express = require("express"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  db = require("./api/db"),
  cors = require("cors"),
  app = express();

//DB connection
db();
//middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routes
app.use("/ninjas", require("./api/routes/ninjas"));

app.use((error, req, res, next) => {
  if (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
});

module.exports = app;
