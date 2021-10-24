var AWS = require("aws-sdk");

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

let params = {
  TableName: table,
};
dbRead(params).then((data) => {
  console.log("-->", data.slice(-12));
});
