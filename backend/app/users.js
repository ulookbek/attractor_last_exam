const router = require('express').Router();
const UserModel = require('../models/User');
const config = require('../config');
const { nanoid } = require('nanoid');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const { CastError } = require('mongoose').Error;

router.post('/', async (req, res) => {
  try {
    const errors = {};
    if (Object.keys(errors).length !== 0) {
      return res.status(400).send({ errors });
    }
    const user = new UserModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      subscription: req.body.subscription
    });
    user.confirmed = nanoid();
    user.genToken();
    await user.save();
    const verifySendLink = config.verifyLink + user.confirmed;
    const message = {
      to: req.body.email,
      subject: 'Подтверждение регистрации на Tell Story',
      text: `
                Вы успешно зарегистрировались на сайте Tell Story
                
                Ваш логин: ${req.body.username}
                Ваш E-mail: ${req.body.email}
                
                Пройдите по ссылке чтобы подтвердить свою почту: ${verifySendLink}
                
                Данное письмо не требует ответа.
            `,
    };

    mailer(message);

    return res.send({
      message: `Регистрация прошла успешно. Вам отправлено письмо на: ${req.body.email} для подтверждения почты.`,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const errors = {};
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === '') {
        errors[key] = {
          message: 'Поле не должно быть пустым.',
        };
      }
    });
    if (Object.keys(errors).length !== 0) {
      return res.status(400).send({ errors: errors });
    }
    const user = await UserModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (!user) return res.status(404).send({ error: 'Пользователь не найден' });
    const isMatch = await user.checkPass(req.body.password);
    if (!isMatch) return res.status(400).send({ error: 'Неверный пароль' });
    if (user.confirmed !== true)
      return res.status(403).send({
        error:
          'Вам нужно подтвердить свою почту. Письмо отправлено на указанную почту при регистрации.',
      });
    user.genToken();
    await user.save({ validateBeforeSave: false });
    return res.send({
      user: {
        username: user.username,
        token: user.token,
        role: user.role,
        email: user.email,
        _id: user._id,
        hasChatRoom: user.hasChatRoom,
        online_status: user.online_status,
        telegram_id_psycho: user.telegram_id_psycho,
      },
      message: 'Добро пожаловать',
    });
  } catch (e) {
    return res.status(400).send({ error: 'Bad Request' });
  }
});

router.get('/profile', [auth], async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      subscription: user.subscription,
      role: user.role,
    });
  } catch (e) {
    res.status(404).send({ error: 'Пользователь не найден' });
  }
});

router.put('/profile', [auth], async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.user._id });
    if (!user) return res.status(404).send({ error: 'Пользователь не найден' });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.subscription = req.body.subscription
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    await user.save({ validateBeforeSave: false });

    return res.send({
      user: {
        username: user.username,
        token: user.token,
        email: user.email,
        subscription: user.subscription,
        role: user.role,
      },
      message: 'Данные аккаунта успешно изменены',
    });
  } catch (e) {
    return res.status(400).send({ error: 'Такой пользователь уже существует' });
  }
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  try {
    const success = { message: 'Success' };
    if (!token) return res.send(success);
    const user = await UserModel.findOne({ token });
    if (!user) return res.send(success);
    user.genToken();
    await user.save({ validateBeforeSave: false });
    return res.send({ message: 'Вы вышли из своего аккаунта' });
  } catch (e) {
    return res.send(e);
  }
});

router.delete('/delete-user/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const user = await UserModel.findOneAndRemove({ _id: req.params.id },
      { new: true });
    if (!user) return res.status(404).send({ error: 'Пользователь не найден' });
    if (user.role === 'psychologist' && user.telegram_id_psycho) {
      await Bot.telegram.kickChatMember('-547045740', user.telegram_id_psycho);
    }
    return res.send({ message: `Пользователь ${user.username} удалён` });
  } catch (e) {
    if (e instanceof CastError) {
      return res.status(400).send({ error: 'Неверно указан ID.' });
    } else {
      return res.status(500).send({ error: 'Eternal Server Error' });
    }
  }
});

module.exports = router;
