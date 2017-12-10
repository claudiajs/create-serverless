'use strict'
const path = require('path'),
  fs = require('fs'),
  fsUtil = require('../util/fs-util'),
  AWS = require('aws-sdk')

exports.genPackage = function (projectPath, region, hasDynamoDB, alternativePackageTemplatePath){
	const srcPath = alternativePackageTemplatePath || path.join(__dirname, '../app-templates/package.json'),
		destPath = path.join(projectPath, 'package.json')
  return fsUtil.copyAndReplaceInFile(/#{projectName}/g, path.basename(projectPath), srcPath, destPath)
    .then(() => fsUtil.replaceStringInFile(/#{region}/g, region, destPath))
    .then(() => {
      let policies = hasDynamoDB ? ' --policies policies' : ''
      return fsUtil.replaceStringInFile(/#{policies}/g, policies, destPath)
    })
}

exports.genRoute = function (appTemplateRelativePath, endpointName, projectPath) {
  return new Promise((resolve, reject) => {
    if (!appTemplateRelativePath) reject('appTemplateRelativePath wasn\'t specified')
    fs.readFile(path.join(__dirname, appTemplateRelativePath) , (err, data) => {
      if (err) reject(err)
      return resolve(data)
    })
  })
    .then((data) => {
      return new Promise((resolve, reject) => {
        fs.appendFile(path.join(projectPath, 'index.js'), data, (err) => {
          if (err) reject(err)
          return resolve()
        });
      })
    })
    .then(() => fsUtil.replaceStringInFile(/#{endpoint}/g, endpointName, path.join(projectPath, 'index.js')))
}

exports.genPolicies = function (projectPath){
  const srcPath = path.join(__dirname, '../app-templates/dynamo/policies.json'),
  destFolderPath =  path.join(projectPath, '/policies')
  return (fsUtil.isDir(destFolderPath) ? Promise.resolve() : fsUtil.makeDir(destFolderPath)).then(() => {
    const	policiesPath = path.join(destFolderPath, 'policies.json')
    return fsUtil.copyAndReplaceInFile(/#{projectName}/g, path.basename(projectPath), srcPath, policiesPath)
  })
}

exports.createTable = function (tableName, region){
  tableName = convertToCamelCase(tableName)
  let dynamoDb = new AWS.DynamoDB({region: region || 'us-east-1'});
  let parameters = {
    AttributeDefinitions: [{
      AttributeName: `${tableName}Id`,
      AttributeType: 'S'
    }],
    KeySchema: [{
        AttributeName: `${tableName}Id`,
        KeyType: 'HASH'
    }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: tableName
  }

  return dynamoDb.createTable(parameters)
    .promise()
    .then(data => data)
}

function convertToCamelCase(input) { 
  return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
  });
}
