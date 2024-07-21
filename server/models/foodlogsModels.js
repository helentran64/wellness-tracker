const mongoose = require("mongoose");
const { Schema } = mongoose;

const MealSchema = new Schema(
  {
    breakfast: { type: Array, default: [] },
    lunch: { type: Array, default: [] },
    dinner: { type: Array, default: [] },
    snack: { type: Array, default: [] },
  },
  { _id: false }
);

const FoodLogSchema = new Schema({
  username: { type: String, required: true },
  logs: { type: Map, of: MealSchema },
});

module.exports = mongoose.model("FoodLog", FoodLogSchema);
