const express = require("express");

// Reach Sequelize models
const User = require("../sequelize/models/User");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "Invalid request",
    });
  }
});

// Post an user
router.post("/", async (req, res) => {
  try {
    const { pseudo, score } = req.body;
    const result = await User.create({ pseudo, score });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `Invalid request`,
    });
  }
});

module.exports = router;
