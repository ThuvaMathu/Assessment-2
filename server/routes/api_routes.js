const express = require("express");

const apiControler = require("../controllers/api_controllers");
const s3Controller = require("../controllers/s3_controller");

const router = express.Router();

router.post("/searchimage", apiControler.getImages);
router.post("/symbol", apiControler.getSymbol);
router.post("/info", apiControler.getInfo);
router.post("/price", apiControler.getPrice);
router.get("/visitcount", s3Controller.getViewCounter);
router.post("/setItem", s3Controller.setUserData);
router.post("/login", s3Controller.getUserData);

//router.post("/setItem", ddbController.setData);

module.exports = router;
