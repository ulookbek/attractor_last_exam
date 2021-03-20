const router = require("express").Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const EstablishmentImages = require("../models/EstablishmentImages");

router.post("/", [auth, upload.single("images")], async (req, res) => {
    const dataOfImage = req.body;
    if (req.file) dataOfImage.images = req.file.filename;
    const imageOfEstablishment = new EstablishmentImages(dataOfImage);
    try {
        await imageOfEstablishment.save();
        res.send(imageOfEstablishment);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;