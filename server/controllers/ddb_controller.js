const awsConfig = require("../app");
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-2" });
const bcrypt = require("bcrypt");
const request = require("request").defaults({ encoding: null });
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const signUp = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(pass, salt);
  const getParams = {
    ExpressionAttributeNames: { "#qut": "qut-username", "#user": "email" },
    FilterExpression: `#qut= :q AND #user = :u`,
    ExpressionAttributeValues: {
      ":q": { S: "n10782672@qut.edu.au" },
      ":u": { S: String(email) },
    },
    TableName: awsConfig.ddbTableName,
  };
  const putParams = {
    Item: {
      "qut-username": { S: "n10782672@qut.edu.au" },
      email: { S: String(email) },
      pass: { S: String(hashPass) },
      firstname: { S: String(firstname) },
      lastname: { S: String(lastname) },
      Images: { L: [] },
    },
    TableName: awsConfig.ddbTableName,
  };

  dynamodb.scan(getParams, function (err, getRes) {
    if (err) {
      console.log(err, "error scanning database");
      res.json({ status: 500, message: "failed to getItem", error: err });
    } else {
      //res.json({ status: 200, message: "success", data: data });
      if (getRes.Count === 0) {
        dynamodb.putItem(putParams, function (err, resData) {
          if (err) {
            console.log(err, "error in putItem");
            res.json({ status: 500, message: "failed to putItem" });
          } else {
            res.json({ status: 200, message: "User data added" });
          }
        });
      } else {
        res.json({ status: 500, message: "user already exist try login" });
      }
    }
  });
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const params = {
    ExpressionAttributeNames: { "#qut": "qut-username", "#user": "email" },
    FilterExpression: `#qut= :q AND #user = :u`,

    ExpressionAttributeValues: {
      ":q": { S: "n10782672@qut.edu.au" },
      ":u": { S: String(email) },
    },
    TableName: awsConfig.ddbTableName,
  };
  dynamodb.scan(params, async function (err, data) {
    if (err) {
      console.log(err);
      res.json({ status: 500, message: "failed to getItem", error: err });
    } else {
      if (data.Count > 0) {
        var userData = {};
        Object.entries(data.Items[0]).map((d) => {
          userData[d[0]] = d[1].S;
        });
        userData["loginStatus"] = 200;
        const validPassword = await bcrypt.compare(pass, String(userData.pass));

        if (validPassword) {
          delete userData.pass;
          res.json({ status: 200, data: userData, message: "Success" });
        } else {
          res.json({
            status: 500,
            message: "Invalid user credentials ",
            data: data,
          });
        }
      } else {
        res.json({
          status: 500,
          message: "User does not exist! Please sign up",
        });
      }
    }
  });
};

const getImage = async (req, res) => {
  const email = req.body.email;
  const getParams = {
    ExpressionAttributeNames: { "#qut": "qut-username", "#user": "email" },
    FilterExpression: `#qut= :q AND #user = :u`,
    ExpressionAttributeValues: {
      ":q": { S: "n10782672@qut.edu.au" },
      ":u": { S: String(email) },
    },
    TableName: awsConfig.ddbTableName,
  };
  dynamodb.scan(getParams, function (err, getRes) {
    if (err) {
      console.log(err, "error scanning database");
      res.json({ status: 500, message: "failed to getItem", error: err });
    } else {
      console.log(getRes.Count, "\nres data");
      res.json({
        status: 200,
        message: "ok",
        data: getRes.Items[0].Images["L"],
      });
    }
  });
};

const addImage = async (req, res) => {
  const email = req.body.email;
  const rawImage = req.body.data;
  const url = req.protocol + "://" + req.get("host");
  var baseImage = rawImage.split(",")[1];
  var base64Rejex =
    /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
  var isBase64Valid = base64Rejex.test(baseImage);
  if (!isBase64Valid) {
    request.get(rawImage, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const baseImage =
          "data:" +
          response.headers["content-type"] +
          ";base64," +
          Buffer.from(body).toString("base64");

        addData(baseImage, url, email)
          .then((data) => {
            res.json({
              status: 200,
              message: "success upload remote image",
              data: data,
            });
          })
          .catch((err) => {
            console.log("error in putItem", err);
            res.json({
              status: 500,
              message: "failed to upload remote image",
              error: err,
            });
          });
      } else {
        console.log("data not supported");
        res.json({ status: 500, message: "data not supported", error: error });
      }
    });
  } else {
    addData(rawImage, url, email)
      .then((data) => {
        res.json({
          status: 200,
          message: "success upload raw image",
          data: data,
        });
      })
      .catch((err) => {
        console.log("error in putItem", err);
        res.json({
          status: 500,
          message: "failed to upload raw image",
          error: err,
        });
      });
  }
};

function addData(paramData, urlReq, email) {
  const resultData = new Promise((resolve, reject) => {
    portable(paramData, urlReq)
      .then((urlData) => {
        const params = {
          TableName: awsConfig.ddbTableName,
          Key: {
            "qut-username": { S: "n10782672@qut.edu.au" },
            email: { S: String(email) },
          },
          ExpressionAttributeNames: {
            "#data": "Images",
          },
          ExpressionAttributeValues: {
            ":d": {
              L: [{ S: String(urlData) }],
            },
          },
          UpdateExpression: "set #data = list_append(#data,:d)",
          ReturnValues: "UPDATED_NEW",
        };
        dynamodb.updateItem(params, function (err, data) {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(urlData);
          }
        });
      })
      .catch(function (err) {
        reject(new Error(err));
      });
  });

  return resultData;
}

function portable(paramData, url) {
  const resultData = new Promise((resolve, reject) => {
    const reqData = paramData;
    var data = reqData.split(",")[1];
    let buffer = Buffer.from(data, "base64");

    const commonPath = path.join("./images", `${uuid.v4()}.png`);
    const urlPath = url + "/" + commonPath;
    const storagePath = path.join(__dirname, "../", commonPath);
    try {
      sharp(buffer).png().toFile(storagePath);
      resolve(urlPath);
    } catch (error) {
      reject(new Error(error));
    }
  });
  return resultData;
}

module.exports.getImage = getImage;
module.exports.addImage = addImage;
module.exports.signIn = signIn;
module.exports.signUp = signUp;
