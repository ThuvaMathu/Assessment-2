const express = require("express");

const s3Controller = require("../controllers/s3_controller");
const ddbController = require("../controllers/ddb_controller");

const router = express.Router();

router.get("/visitcount", s3Controller.getViewCounter);
router.post("/searchimage", s3Controller.getImages);
router.post("/getimage", ddbController.getImage);
router.post("/signup", ddbController.signUp);
router.post("/signin", ddbController.signIn);
router.post("/addimage", ddbController.addImage);
module.exports = router;
