const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
// routes
const userLikes = require("./routes/likes");
const totalLikes = require("./routes/totallikes");
const uri =
  "mongodb+srv://mostafa:0123327000Rock@newhorizon.prkac.mongodb.net/carbons?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server is running"));
const client = path.join(__dirname, "/frontend/githuber/build");

app.use(express.static(client), express.json(), userLikes, totalLikes);
