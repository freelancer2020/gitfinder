const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server is running"));
const client = path.join(__dirname, "/frontend/githuber/build");

app.use(express.static(client));
