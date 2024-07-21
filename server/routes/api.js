const express = require("express");
const router = express.Router();
const Users = require("../models/usersModels");
const FoodLogs = require("../models/foodlogsModels");
const Diaries = require("../models/diariesModels");

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await Users.findOne({ username: username });
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Create a new user instance
    const newUser = new Users({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/foodlogs", async (req, res) => {
  try {
    const foodlogs = await FoodLogs.find();
    res.json(foodlogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/foodlogs/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const userFoodLog = await FoodLogs.findOne({ username: username });
    return res.json(userFoodLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/foodlogs/:username", async (req, res) => {
  const { username } = req.params;
  const { mealType, food, date } = req.body; // mealType can be 'breakfast', 'lunch', 'dinner', or 'snack'

  try {
    // Find the user's food log
    let userFoodLog = await FoodLogs.findOne({ username: username });

    if (userFoodLog) {
      // If the food log exists, update the appropriate date and meal type
      if (!userFoodLog.logs.has(date)) {
        userFoodLog.logs.set(date, {
          breakfast: [],
          lunch: [],
          dinner: [],
          snack: [],
        });
      }
      userFoodLog.logs.get(date)[mealType].push(food);
    } else {
      // If the food log does not exist, create a new one
      userFoodLog = new FoodLogs({
        username: username,
        logs: {
          [date]: {
            breakfast: mealType === "breakfast" ? [food] : [],
            lunch: mealType === "lunch" ? [food] : [],
            dinner: mealType === "dinner" ? [food] : [],
            snack: mealType === "snack" ? [food] : [],
          },
        },
      });
    }

    await userFoodLog.save();
    res.json(userFoodLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/foodlogs/:username", async (req, res) => {
  const { username } = req.params;
  const { mealType, foodEntry, date } = req.body;

  try {
    let userFoodLog = await FoodLogs.findOne({ username });

    if (!userFoodLog) {
      return res.status(404).json({ message: "User not found" });
    }

    const selectedFoodEntry = userFoodLog.logs.get(date);
    if (!selectedFoodEntry) {
      return res
        .status(404)
        .json({ message: "No logs found for the specified date" });
    }

    const foodIndex = selectedFoodEntry[mealType].findIndex(
      (food) =>
        food.name === foodEntry.name && food.calories === foodEntry.calories
    );
    if (foodIndex === -1) {
      return res
        .status(404)
        .json({ message: "Food item not found in the specified meal type" });
    }

    selectedFoodEntry[mealType].splice(foodIndex, 1);

    userFoodLog.logs.set(date, selectedFoodEntry);
    await userFoodLog.save();

    res.json({ message: "Food item removed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error deleting food item: ${err.message}` });
  }
});

router.get("/diaries", async (req, res) => {
  try {
    const diaries = await Diaries.find();
    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/diaries/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const diary = await Diaries.findOne({ username: username });
    res.json(diary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/diaries/:username", async (req, res) => {
  const { username } = req.params;
  const { topic, note, dateAndTime } = req.body;

  try {
    let userDiary = await Diaries.findOne({ username: username });

    if (userDiary) {
      userDiary.topics.push(topic);
      userDiary.notes.push(note);
      userDiary.dateAndTimes.push(dateAndTime);
    } else {
      userDiary = new Diaries({
        username: username,
        topics: topic,
        notes: note,
        dateAndTimes: dateAndTime,
      });
    }
    await userDiary.save();
    res.json(userDiary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
