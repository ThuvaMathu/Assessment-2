const axios = require("axios");
const sharp = require("sharp");

const importImg = async (req, res) => {
  const reqData = req.body.image;
  console.log(reqData);
  try {
    const metadata = await sharp(reqData).metadata();
    res.json({ status: 200, data: metadata, message: "Success" });
    console.log(metadata);
  } catch (error) {
    //console.log(error);
    res.json({ status: 500, message: "meta request failed" });
  }
};

const cropImg = async (req, res) => {
  const reqData = req.body;
  try {
    res.json({ status: 200, data: "", message: "Success" });
  } catch (error) {
    res.json({ status: 500, message: "Crop request failed" });
  }
};
const cropExactImg = async (req, res) => {
  const reqData = req.body;
  try {
    res.json({ status: 200, data: "", message: "Success" });
  } catch (error) {
    res.json({ status: 500, message: "Crop exact request failed" });
  }
};
const filterImg = async (req, res) => {
  const reqData = req.body;
  try {
    res.json({ status: 200, data: "", message: "Success" });
  } catch (error) {
    res.json({ status: 500, message: "filter request failed" });
  }
};
const grayScaleImg = async (req, res) => {
  const reqData = req.body;
  try {
    res.json({ status: 200, data: "", message: "Success" });
  } catch (error) {
    res.json({ status: 500, message: "gray scalling request failed" });
  }
};
const rotateImg = async (req, res) => {
  const reqData = req.body;
  try {
    res.json({ status: 200, data: "", message: "Success" });
  } catch (error) {
    res.json({ status: 500, message: "rotate image request failed" });
  }
};

module.exports.importImg = importImg;
module.exports.cropImg = cropImg;
module.exports.cropExactImg = cropExactImg;
module.exports.filterImg = filterImg;
module.exports.grayScaleImg = grayScaleImg;
module.exports.rotateImg = rotateImg;
