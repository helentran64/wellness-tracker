const mongoose = require("mongoose");

const foodlogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  breakfast: {
    type: Array,
  },
  lunch: {
    type: Array,
  },
  dinner: {
    type: Array,
  },
  snack: {
    type: Array,
  },
});

module.exports = mongoose.model("FoodLog", foodlogSchema);
