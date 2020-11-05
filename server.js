const express = require("express");

var cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
require("dotenv").config();
//const mongoUrl = require("./connection/db");
const port = process.env.PORT || 8500;

app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use("/api/users/", require("./route/user"));
app.use("/api/books/", require("./route/book"));

app.use("/api/auth/", require("./route/auth"));
app.use("/api/", require("./route/issue"));
app.use("/api/messages/", require("./route/message"));


app.listen(port, (req, res) => {
  console.log("Running");
});
