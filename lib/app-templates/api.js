const ApiBuilder = require('claudia-api-builder'),
  uuid = require('uuid/v4'),
  AWS = require('aws-sdk');

var api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;
