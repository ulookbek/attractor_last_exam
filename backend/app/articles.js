const router = require("express").Router();
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");

const Article = require("../models/Establishment");
const UserModel = require("../models/User");

module.exports = router;
