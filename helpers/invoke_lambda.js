var AWS = require("aws-sdk");

const main = async () => {
  AWS.config.update({
    region: "eu-west-1",
  });

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
};

main().catch((error) => console.error(error));
