const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  likes: { type: Number },
  agent: { type: String },
});

const User = mongoose.model("agent", agentSchema);

class Agent {
  static async postLike() {
    try {
      const user = new User({ likes: 1 });
      await user.save();
      return user;
    } catch (err) {}
  }
}

agentSchema.loadClass(Agent);
module.exports = User;
