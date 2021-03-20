const router = require("express").Router();
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const upload = require("../middlewares/upload");
const Establishment = require("../models/Establishment");

router.post("/", [auth, upload.single("main_image")], async (req, res) => {
    const establishmentData = req.body;
    if (req.file) establishmentData.main_image = req.file.filename;
    const establishment = new Establishment(establishmentData);
    try {
        await establishment.save();
        res.send(establishment);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/", async (req, res) => {
    try {
        const establishments = await Establishment.find()
        res.send(establishments);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const establishment = await Establishment.findById(req.params.id)
        res.send(establishment);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete("/:id", [auth, permit("admin")], async (req, res) => {
    try {
        const establishment = await Establishment.findById(req.params.id)
        establishment.remove()
        res.send(establishment);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;