const awsConfig = require("../app");
const bcrypt = require("bcrypt");
const axios = require("axios");
const redis = require("redis");

const getViewCounter = async (req, res) => {
  const s3CounterKey = `visitcount`;
  const s3 = awsConfig.S3;
  const bucketName = awsConfig.bucketName;
  const params = { Bucket: bucketName, Key: s3CounterKey };
  try {
    const s3Result = await s3.getObject(params).promise();
    const s3JSON = JSON.parse(s3Result.Body);
    const countIncreser = s3JSON.count + 1;
    //console.log(s3JSON.count);
    res.json({ status: 200, ...s3JSON });
    try {
      const body = JSON.stringify({
        source: "S3 Bucket",
        count: countIncreser,
      });
      const objectParams = {
        Bucket: bucketName,
        Key: s3CounterKey,
        Body: body,
      };
      await s3.putObject(objectParams).promise();
      console.log(`Successfully Updated data to ${bucketName}/${s3CounterKey}`);
    } catch (error) {
      console.log(
        `Error while updating data to ${bucketName}/${s3CounterKey}`,
        error
      );
    }
  } catch (err) {
    if (err.statusCode === 404) {
      const body = JSON.stringify({
        source: "S3 Bucket",
        count: 1,
      });
      const objectParams = {
        Bucket: bucketName,
        Key: s3CounterKey,
        Body: body,
      };
      await s3.putObject(objectParams).promise();
      console.log(
        `Successfully uploaded data to ${bucketName}/${s3CounterKey}`
      );
      res.json({ status: 200, source: "S3 Bucket", count: 1 });
    } else {
      res.json(err);
    }
  }
};

const setUserData = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const s3Key = email;
  const salt = await bcrypt.genSalt(10);
  const bucketName = awsConfig.bucketName;
  const hashPass = await bcrypt.hash(pass, salt);
  const body = JSON.stringify({
    email: email,
    pass: hashPass,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  const putParams = { Bucket: bucketName, Key: s3Key, Body: body };
  try {
    const getParams = { Bucket: bucketName, Key: s3Key };
    await awsConfig.S3.getObject(getParams).promise();
    res.json({ status: 500, message: "user already exist try login" });
  } catch (error) {
    //console.log("exist", error);
    try {
      await awsConfig.S3.putObject(putParams).promise();
      console.log("Succeeded adding an item to in the database");
      res.json({ status: 200, message: "User data added" });
    } catch (error) {
      console.error("Error sending data to the database", error);
      res.json({ status: 500, message: "failed to send data" });
    }
  }
};

const getUserData = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const s3Key = email;
  const body = JSON.stringify({
    email: email,
    pass: pass,
  });
  const getParams = { Bucket: awsConfig.bucketName, Key: s3Key };
  try {
    const s3Result = await awsConfig.S3.getObject(getParams).promise();
    const userData = JSON.parse(s3Result.Body);
    userData["loginStatus"] = 200;

    //res.json({ statu: 200, data: userData, message: "Success" });
    console.log(userData.pass);
    const validPassword = await bcrypt.compare(pass, userData.pass);
    console.log(validPassword);
    if (validPassword) {
      delete userData.pass;
      res.json({ status: 200, data: userData, message: "Success" });
    } else {
      res.json({ status: 500, message: "Invalid user credentials " });
    }
  } catch (error) {
    console.error("user not exist whentry login", error);
    res.json({ status: 500, message: "User does not exist! Please sign up" });
  }
};


const getImages = async (req, res, next) => {
  // Redis setup
  const redisClient = redis.createClient();
  
  redisClient.connect().catch((err) => {
    console.log(err);
  });
  const bdata = req.body.reqData;
  const options = {
    method: "GET",
    url: "https://pexelsdimasv1.p.rapidapi.com/v1/search",
    params: { query: bdata, locale: "en-US", per_page: "100", page: "1" },
    headers: {
      Authorization: "563492ad6f917000010000010bc59003765749af8c148450380a1309",
      "X-RapidAPI-Key": "c2ad33e329msh5ae5eed64b2c321p1501edjsn57f7ac1ab1f1",
      "X-RapidAPI-Host": "PexelsdimasV1.p.rapidapi.com",
    },
  };
  const s3Key = email;
  const redisKey = email;

  redisClient.get(redisKey).then((result) => {
    if (result) {
      // Serve from redis
      console.log(`Found in Redis`);
      const resultJSON = JSON.parse(result);
      res.json(resultJSON);
    } else {
      console.log("Checking S3...");
      // Check S3
      const params = {
        Bucket: bucketName,
        Key: s3Key,
      };
      s3.getObject(params)
        .promise()
        .then((result) => {
          //Serve from S3
          console.log(`Found in S3`);
          const resultJSON = JSON.parse(result.Body);
          redisClient.setEx(
            redisKey,
            3600,
            JSON.stringify({ ...resultJSON, source: "Redis Cache" })
          );
          console.log(`Saved to redis ${redisKey}`);
          res.json(resultJSON);
        })
        .catch((err) => {
          if (err.statusCode === 404) {
            // Serve from Pexels and store in redis
            axios.get(options).then((response) => {
              const responseJSON = response.data;
              redisClient.setEx(
                redisKey,
                3600,
                JSON.stringify({
                  ...responseJSON,
                  source: "Redis Cache",
                })
              );
              const body = JSON.stringify({
                ...responseJSON,
                source: "S3 Bucket",
              });
              const objectParams = {
                Bucket: bucketName,
                Key: s3Key,
                Body: body,
              };
              s3.putObject(objectParams)
                .promise()
                .then(() => {
                  console.log(
                    `Successfully uploaded data to ${bucketName}/${s3Key}`
                  );
                  res.json({
                    source: "options",
                    ...responseJSON,
                  });
                })
                .catch((err) => res.json(err));
            });
          } else {
            //if not 404
            res.json(err);
          }
        });
    }
  });

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     res.json(response.data);
  //     //console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
};

module.exports.getImages = getImages;
module.exports.getViewCounter = getViewCounter;
module.exports.setUserData = setUserData;
module.exports.getUserData = getUserData;
