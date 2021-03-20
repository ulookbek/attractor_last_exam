const router = require('express').Router();
const UserModel = require('../models/User');
const config = require('../config');
const { nanoid } = require('nanoid');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const { CastError } = require('mongoose').Error;

router.post('/', async (req, res) => {
  try {
    const user = new UserModel({
      fullname: req.body.fullname,
      username: req.body.username,
      password: req.body.password,
    });
    user.generateToken();
    await user.save();
    return res.status(200).send({
      message: `Регистрация прошла успешно!`,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
