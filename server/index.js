const express = require("express");
const path = require("path");
const AWS = require("aws-sdk");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

AWS.config.update({
  region: "eu-west-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const dbRead = async (params) => {
  let promise = docClient.scan(params).promise();
  let result = await promise;
  let data = result.Items;
  if (result.LastEvaluatedKey) {
    params.ExclusiveStartKey = result.LastEvaluatedKey;
    data = data.concat(await dbRead(params));
  }
  return data;
};

app.use(cors());

// Data comes from AWS Lambda
app.get("/awstips", (req, res) => {
  const main = async () => {
    const params = {
      FunctionName: "AwsTips",
      Payload: JSON.stringify({}),
    };

    const result = await new AWS.Lambda().invoke(params).promise();

    console.log("Success!");
    const payload = result.Payload;
    const body = JSON.parse(payload);
    const tip = JSON.parse(body.body).message;
    console.log(tip);
    res.json(tip);
  };

  main().catch((error) => console.error(error));
});

// This one works only when the code runs in EC2 instance
app.get("/instance", (req, res) => {
  var meta = new AWS.MetadataService();
  meta.request("/latest/meta-data/instance-id", (err, data) => {
    console.log(data);
    res.json(data);
  });
});

// Data comes from DynamoDB
app.get("/movies", (req, res) => {
  let params = {
    TableName: "Movies",
  };
  dbRead(params).then((data) => {
    res.json(data.slice(-80));
  });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
