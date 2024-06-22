const express = require('express');
const router = express.Router();
const Users = require('../models/usersModels');

router.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
