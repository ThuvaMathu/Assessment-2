const path = require("path");
const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();
app.use(express.json());
const AWS = require("aws-sdk");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//app.use(express.static("./view"));

const apisRouter = require("./routes/api_routes");
const imgRouter = require("./routes/img_routes");
app.use("/api", apisRouter);
app.use("/api", imgRouter);

if (process.env.SHOW_CONSOLE == "true") {
  console.log(".env data: ", process.env);
}

const config = {
  region: "ap-southeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
};
AWS.config.update(config);
//console.log("config:", config);
const bucketName = "n10782672-instainvit";
//const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const s3 = new AWS.S3({ apiVersion: "2006-03-01", ...config });
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10", ...config });

(async () => {
  try {
    await s3.createBucket({ Bucket: bucketName }).promise();
    console.log(`Created bucket: ${bucketName}`);
  } catch (err) {
    if (err.statusCode !== 409) {
      console.log(`Error creating bucket: ${err}`);
    }
    console.log("Bucket already exists");
  }
})();

module.exports.AWS = AWS;
module.exports.S3 = s3;
module.exports.dynamodb = dynamodb;
module.exports.bucketName = bucketName;

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./view", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
