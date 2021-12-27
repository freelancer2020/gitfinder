const express = require("express");
const totalLikes = express.Router();

const User = require("../agent/agent");

totalLikes.get("/api/totallikes", async (req, res) => {
  try {
    const agentObject = await User.findOne({ agent: "gitfinder" });
    const totalLike = agentObject["likes"];
    res.status(200).json({ total: totalLike });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = totalLikes;
