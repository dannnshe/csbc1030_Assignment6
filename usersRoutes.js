const express = require("express");
const router = express.Router();
const { readUsers, writeUsers } = require("./userOperations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const users = readUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 

router.post("/", (req, res) => {
  try {
    const users = readUsers();
    users.push(req.body);
    writeUsers(users);
    res.status(201).send({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
