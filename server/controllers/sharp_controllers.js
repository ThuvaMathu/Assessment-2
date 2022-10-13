const sharp = require("sharp");

const importImg = async (req, res) => {
  const reqData = req.body.image;
  var data = reqData.split(",")[1];
  let buffer = Buffer.from(data, "base64");
  try {
    const url = req.protocol + "://" + req.get("host");
    const metadata = await sharp(buffer).metadata();
    await sharp(buffer)
      .resize({ width: 1000 })
      .png()
      .toBuffer(function (err, outputBuffer, info) {
        if (err) throw err;
        let base64data = outputBuffer.toString("base64");
        res.json({
          status: 200,
          message: "Success",
          base64Img: base64data,
          buff: outputBuffer,
          meta: info,
        });
        console.log("filter all res send");
      });
  } catch (error) {
    console.log(error, "import error");
  }
};

const filterImg = async (req, res) => {
  const initBuffer = req.body.buffer;
  const brightness = req.body.brightness;
  const lightness = req.body.lightness;
  const saturation = req.body.saturation;
  const hue = req.body.hue;
  let buffer = Buffer.from(initBuffer, "base64"); //
  try {
    console.log(brightness, saturation, hue, lightness);
    sharp(buffer)
      .modulate({
        brightness: Number(brightness),
        saturation: Number(saturation),
        hue: Number(hue),
        lightness: Number(lightness),
      })
      .toFormat("png")
      .toBuffer(function (err, outputBuffer, info) {
        if (err) {
          throw err;
        }
        let base64data = outputBuffer.toString("base64");
        res.json({
          status: 200,
          message: "Success",
          base64Img: base64data,
          buff: outputBuffer,
          meta: info,
        });
        console.log("filter all res send");
      });
  } catch (error) {
    res.json({ status: 500, message: "Crop exact request failed" });
  }
};

const cropExactImg = async (req, res) => {
  const initBuffer = req.body.buffer;
  const height = req.body.height;
  const width = req.body.width;
  const top = req.body.top;
  const left = req.body.left;
  let buffer = Buffer.from(initBuffer, "base64"); //
  try {
    sharp(buffer)
      .extract({
        width: Number(width),
        height: Number(height),
        left: Number(left),
        top: Number(top),
      })
      .toFormat("png")
      .toBuffer(function (err, outputBuffer, info) {
        if (err) {
          throw err;
        }
        let base64data = outputBuffer.toString("base64");
        res.json({
          status: 200,
          message: "Success",
          base64Img: base64data,
          buff: outputBuffer,
          meta: info,
        });
        console.log("filter all res send");
      });
  } catch (error) {
    res.json({ status: 500, message: "Crop exact request failed" });
  }
};

const rotateImg = async (req, res) => {
  const initBuffer = req.body.buffer;
  const angle = req.body.angle;
  const red = req.body.red;
  const green = req.body.green;
  const blue = req.body.blue;
  const alpha = req.body.opacity;
  console.log(red, blue, green, alpha);
  let buffer = Buffer.from(initBuffer, "base64");
  try {
    sharp(buffer)
      .rotate(angle, {
        background: {
          r: Number(red),
          g: Number(green),
          b: Number(blue),
          alpha: Number(alpha),
        },
      })
      .resize({ width: 1000 })
      .png()
      .toBuffer(function (err, outputBuffer, info) {
        if (err) throw err;
        let base64data = outputBuffer.toString("base64");
        res.json({
          status: 200,
          message: "Success",
          base64Img: base64data,
          buff: outputBuffer,
          meta: info,
        });
        console.log("rotate res send");
      });
  } catch (error) {
    res.json({ status: 500, message: "rotate image request failed" });
  }
};

module.exports.importImg = importImg;
module.exports.cropExactImg = cropExactImg;
module.exports.filterImg = filterImg;
module.exports.rotateImg = rotateImg;
