const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { nanoid } = require("nanoid");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");

const config = require("../config");
const Establishment = require("../models/Establishment");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

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


router.post("/review", [auth], async (req, res) => {
    const establishment = new Establishment(establishmentData);
    try {
        await establishment.save();
        res.send(establishment);
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;