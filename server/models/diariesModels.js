const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  topics: {
    type: Array,
  },
  notes: {
    type: Array,
  },
  dateAndTimes: {
    type: Array,
  },
});

module.exports = mongoose.model("Diary", diarySchema);
