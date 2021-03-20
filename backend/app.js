const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");

const users = require("./app/users");
const establishments = require("./app/establishments");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose
  .connect(config.database, config.databaseOpt)
  .catch((e) => console.log(config.database))
  .then(() => console.log('<<< MongoDB is worked! >>>'))

app.use("/users", users);
app.use("/establishments", establishments);

app.use((req, res) => {
  res.status(404).send({ error: "404 Not found" });
});

module.exports = app;
