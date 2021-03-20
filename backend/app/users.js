const router = require('express').Router();
const UserModel = require('../models/User');

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

router.post("/sessions", async (req, res) => {
  const user = await UserModel.findOne({ "username": req.body.username });
  !user && res.status(400).send({ error: "Неверные данные" });
  const isMatch = await user.checkPassword(req.body.password);
  !isMatch && res.status(400).send({ error: "Password is wrong" });
  user.generateToken();
  await user.save({ validateBeforeSave: false });
  res.send(user);
});

router.delete("/sessions", async (req, res) => {
  const token = req.get("Authorization");
  const success = { message: "Success" };
  !token && res.send(success);
  const user = await UserModel.findOne({ token });
  !user && res.send(success);
  user.generateToken();
  user.save({ validateBeforeSave: false });
  return res.send(success);
});

module.exports = router;
