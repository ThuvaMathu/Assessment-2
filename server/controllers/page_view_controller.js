const awsConfig = require("../app");
const getViewCounter = async (req, res) => {
  const s3Key = `visitcount`;
  const bucketName = awsConfig.bucketName;
  const s3 = awsConfig.S3;
  const params = { Bucket: bucketName, Key: s3Key };
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
      const objectParams = { Bucket: bucketName, Key: s3Key, Body: body };
      await s3.putObject(objectParams).promise();
      console.log(`Successfully Updated data to ${bucketName}/${s3Key}`);
    } catch (error) {
      console.log(`Error while updating data to ${bucketName}/${s3Key}`, error);
    }
  } catch (err) {
    if (err.statusCode === 404) {
      const body = JSON.stringify({
        source: "S3 Bucket",
        count: 1,
      });
      const objectParams = { Bucket: bucketName, Key: s3Key, Body: body };
      await s3.putObject(objectParams).promise();
      console.log(`Successfully uploaded data to ${bucketName}/${s3Key}`);
      res.json({ status: 200, source: "S3 Bucket", count: 1 });
    } else {
      res.json(err);
    }
  }
};

module.exports.getViewCounter = getViewCounter;
