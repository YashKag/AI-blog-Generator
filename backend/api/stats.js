const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const statsPath = path.join(__dirname, "../data/stats.json");

router.get("/", (req, res) => {
  const statsData = JSON.parse(fs.readFileSync(statsPath, "utf-8"));
  res.json(statsData);
});

module.exports = router;
