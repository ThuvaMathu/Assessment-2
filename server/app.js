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
app.use("/api", apisRouter);
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
const bucketName = "n10782672-pagecounter";
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
const DBTableName = "InvitInstantDB";
var params = {
  AttributeDefinitions: [
    {
      AttributeName: "qut-username",
      AttributeType: "S",
    },
    {
      AttributeName: "email",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "qut-username",
      KeyType: "HASH",
    },
    {
      AttributeName: "email",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: DBTableName,
};

// Create the table.
dynamodb.createTable(params, function (err, data) {
  if (err) {
    if (err.code == "ResourceInUseException") {
      console.log("Table already exist");
    } else console.log("error creating table", err);
  } else {
    console.log("Table Created");
  }
});

module.exports.AWS = AWS;
module.exports.S3 = s3;
module.exports.dynamodb = dynamodb;
module.exports.bucketName = bucketName;
module.exports.DBTableName = DBTableName;

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./view", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
