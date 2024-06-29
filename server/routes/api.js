const express = require("express");
const router = express.Router();
const Users = require("../models/usersModels");
const FoodLogs = require("../models/foodlogsModels");

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

router.get("/foodlogs/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const userFoodLog = await FoodLogs.findOne({ username: username });
    // Check if user exists
    if (!userFoodLog) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(userFoodLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/foodlogs/:username", async (req, res) => {
  const { username } = req.params;
  const { mealType, meal } = req.body; // mealType can be 'breakfast', 'lunch', 'dinner', or 'snack'

  try {
    let userFoodLog = await FoodLogs.findOne({ username: username });

    if (userFoodLog) {
      // Add the meal to the existing food log
      userFoodLog[mealType] = userFoodLog[mealType] || [];
      userFoodLog[mealType].push(meal);
    } else {
      // Create a new food log
      userFoodLog = new FoodLogs({
        username: username,
        [mealType]: [meal],
      });
    }

    await userFoodLog.save();
    res.json(userFoodLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
