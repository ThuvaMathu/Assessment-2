const express = require("express");
const imgControler = require("../controllers/sharp_controllers");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/crop", imgControler.cropExactImg);
router.post("/filter", imgControler.filterImg);
router.post("/importimg", imgControler.importImg);
router.post("/rotate", imgControler.rotateImg);
module.exports = router;
