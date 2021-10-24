"use strict";
console.log("Loading Aws Tips function");

exports.handler = async (event) => {
  let responseCode = 200;
  console.log("request: " + JSON.stringify(event));

  const tips = [
    {
      id: 0,
      tip: "Putting strategy first enables you to determine if (and how) controls and tools support your overall strategy.",
    },
    {
      id: 1,
      tip: "Plan your strategy before setting up tools and controls.",
    },
    {
      id: 2,
      tip: "Know what you are responsible for when working with any cloud provider.",
    },
    {
      id: 3,
      tip: "Create written, consistent cloud security controls and procedures.",
    },
    {
      id: 4,
      tip: "Apply security to ALL layers.",
    },
    {
      id: 5,
      tip: "Take advantage of native cloud security resources.",
    },
    {
      id: 6,
      tip: "Integrate Security into DevOps.",
    },
    {
      id: 7,
      tip: "Know who is accessing your database and for what purposes.",
    },
    {
      id: 8,
      tip: "Define user roles.",
    },
    {
      id: 9,
      tip: "Have only one SSH key per person, and never create shared SSH keys.",
    },
    {
      id: 10,
      tip: "Segment your AWS environments when using VPCs.",
    },
    {
      id: 11,
      tip: "Use EBS Encryption.",
    },
    {
      id: 12,
      tip: "Keep your AWS policies and practices up to date.",
    },
    {
      id: 13,
      tip: "Use key policies to control access to CMKs in AWS KMS.",
    },
    {
      id: 14,
      tip: "Use AMIs for platform components.",
    },
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];

  let responseBody = {
    message: tip,
  };

  let response = {
    statusCode: responseCode,
    headers: {
      "x-custom-header": "my custom header value",
    },
    body: JSON.stringify(responseBody),
  };
  console.log("response: " + JSON.stringify(response));
  return response;
};
