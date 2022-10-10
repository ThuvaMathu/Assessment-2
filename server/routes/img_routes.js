const express = require("express");

const imgControler = require("../controllers/sharp_controllers");

const router = express.Router();

router.post("/crop", imgControler.cropImg);
router.post("/cropexact", imgControler.cropExactImg);
router.post("/filter", imgControler.filterImg);
router.post("/grayscale", imgControler.grayScaleImg);
router.post("/importimg", imgControler.importImg);
router.post("/rotate", imgControler.rotateImg);

//router.post("/setItem", ddbController.setData);

module.exports = router;
