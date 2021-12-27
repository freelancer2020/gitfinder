const express = require("express");
const User = require("../agent/agent");

const userLikes = express.Router();

userLikes.get("/api/like", async (req, res) => {
  try {
    const agentObject = await User.findOne({ agent: "gitfinder" });
    const totalLike = agentObject["likes"] + 1;
    await User.findOneAndUpdate({ agent: "gitfinder" }, { likes: totalLike });
    res.status(200).json({ total: totalLike });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = userLikes;
