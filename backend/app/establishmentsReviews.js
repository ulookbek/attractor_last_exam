const router = require("express").Router();
const auth = require("../middlewares/auth");
const EstablishmentReview = require("../models/EstablishmentReview");

router.post("/", [auth], async (req, res) => {
    const isAlreadyReview = await EstablishmentReview.findOne({ user: req.body.user })
    if (isAlreadyReview) return res.status(400).send({ message: "Вы уже оставили свой отзыв!" });
    const dataOfReview = new EstablishmentReview(req.body);
    try {
        await dataOfReview.save();
        res.send(dataOfReview);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;