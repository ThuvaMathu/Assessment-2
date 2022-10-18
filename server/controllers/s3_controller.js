const awsConfig = require("../app");
const redis = require("redis");
const axios = require("axios");
const redisClient = redis.createClient();
(async () => {
  try {
    await redisClient.connect().then(() => {
      console.log("*Connected to redis");
    });
  } catch (err) {
    console.log(err);
  }
})();

const getViewCounter = async (req, res) => {
  const s3CounterKey = `visitcount`;
  const s3 = awsConfig.S3;
  const bucketName = awsConfig.bucketName;
  const params = { Bucket: bucketName, Key: s3CounterKey };
  try {
    const s3Result = await s3.getObject(params).promise();
    const s3JSON = JSON.parse(s3Result.Body);
    const countIncreser = s3JSON.count + 1;
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

const getImages = async (req, res, next) => {
  // Redis setup
  const s3 = awsConfig.S3;

  const bucketName = awsConfig.bucketName;
  const searchQuery = req.body.reqData;
  const options = {
    method: "GET",
    url: "https://pexelsdimasv1.p.rapidapi.com/v1/search",
    params: { query: searchQuery, locale: "en-US", per_page: "300", page: "1" },
    headers: {
      Authorization: "563492ad6f917000010000010bc59003765749af8c148450380a1309",
      "X-RapidAPI-Key": "c2ad33e329msh5ae5eed64b2c321p1501edjsn57f7ac1ab1f1",
      "X-RapidAPI-Host": "PexelsdimasV1.p.rapidapi.com",
    },
  };

  const CommonKey = `unique-key-${searchQuery}`;

  redisClient.get(CommonKey).then((result) => {
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
        Key: CommonKey,
      };
      s3.getObject(params)
        .promise()
        .then((result) => {
          //Serve from S3
          console.log(`Found in S3`);
          const resultJSON = JSON.parse(result.Body);
          redisClient.setEx(
            CommonKey,
            3600,
            JSON.stringify({ ...resultJSON, source: "Redis Cache" })
          );
          console.log(`Saved to redis ${CommonKey}`);
          res.json(resultJSON);
        })
        .catch((err) => {
          //console.log(err, "try in pexels");
          if (err.statusCode === 404) {
            // Serve from Pexels and store in redis
            axios.request(options).then((response) => {
              const responseJSON = response.data;
              redisClient.setEx(
                CommonKey,
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
                Key: CommonKey,
                Body: body,
              };
              s3.putObject(objectParams)
                .promise()
                .then(() => {
                  console.log(
                    `Successfully uploaded data to ${bucketName}/${CommonKey}`
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
};
module.exports.getImages = getImages;
module.exports.getViewCounter = getViewCounter;
