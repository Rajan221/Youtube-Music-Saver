const Account = require("../model/userAccount");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const UserData = new Account(req.body);
    const response = await UserData.save();
    res.status(201).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", (req, res) => {
  res.send("This is user");
});

module.exports = router;
