const express = require("express");
const imgControler = require("../controllers/sharp_controllers");
const router = express.Router();

router.post("/crop", imgControler.cropExactImg);
router.post("/filter", imgControler.filterImg);
router.post("/importimg", imgControler.importImg);
router.post("/rotate", imgControler.rotateImg);
module.exports = router;
