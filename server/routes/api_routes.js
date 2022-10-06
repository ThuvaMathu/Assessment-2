const express = require("express");

const apiControler = require("../controllers/api_controllers");
const visitController = require("../controllers/page_view_controller");

const router = express.Router();

router.post("/news", apiControler.getNews);
router.post("/symbol", apiControler.getSymbol);
router.post("/info", apiControler.getInfo);
router.post("/chart", apiControler.getChart);
router.post("/price", apiControler.getPrice);
router.get("/visitcount", visitController.getViewCounter);

module.exports = router;
