const express = require("express");
const path = require("path");
const AWS = require("aws-sdk");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

AWS.config.update({
  region: "eu-west-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

async function dbRead(params) {
  let promise = docClient.scan(params).promise();
  let result = await promise;
  let data = result.Items;
  if (result.LastEvaluatedKey) {
    params.ExclusiveStartKey = result.LastEvaluatedKey;
    data = data.concat(await dbRead(params));
  }
  return data;
}

app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/awstips", (req, res) => {
  // res.json({ message: "Hello from server!" });
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

app.get("/movies", (req, res) => {
  let params = {
    TableName: table,
  };
  dbRead(params).then((data) => {
    res.json(data.slice(-12));
  });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
