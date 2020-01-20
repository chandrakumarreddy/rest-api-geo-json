const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GEO_METRY = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere"
  }
});

const ninjaSchema = new Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  availability: { type: Boolean, required: true },
  geometry: { type: GEO_METRY, required: true }
});

module.exports = mongoose.model("ninja", ninjaSchema);
