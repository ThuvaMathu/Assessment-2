const { response } = require("express");
const awsConfig = require("../app");
// var AWS = require("aws-sdk");
// const config = {
//   region: "ap-southeast-2",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   sessionToken: process.env.AWS_SESSION_TOKEN,
// };
// AWS.config.update(config);
//var documentClient = new AWS.DynamoDB.DocumentClient();
//const documentClient = new AWS.DynamoDB.DocumentClient();

const setData = async (req, res) => {
  console.log("setData called");
  const email = req.body.email;
  const pass = req.body.pass;
  var params = {
    TableName: awsConfig.DBTableName,
    Item: {
      email: { S: email },
      pass: { S: pass },
    },
  };

  awsConfig.dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.error("Error sending data to table", err);
      res.json({ statu: 500, message: "failed to send data" });
    } else {
      console.log("Succeeded adding an item to the table: ");
      res.json({ statu: 200, message: "data added" });
    }
  });
};

module.exports.setData = setData;
