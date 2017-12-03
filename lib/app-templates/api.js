const ApiBuilder = require('claudia-api-builder'),
  AWS = require('aws-sdk');

var api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;
