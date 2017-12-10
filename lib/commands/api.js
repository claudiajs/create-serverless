'use strict'
const path = require('path'),
  fs = require('fs'),
  fsUtil = require('../util/fs-util'),
  commandUtil = require('../util/command-util')

module.exports = function generateApi(options, optionalLogger) {
  console.log('generating')
  const region = options['region'] || 'us-east-1'
  let apiActions = options['actions']
	apiActions = apiActions ? apiActions.split('') : undefined

  const source = (options && options.source) || process.cwd(),
    projectPath = options['folder'] ? path.join(source, options['folder']) : source, //if not locally, then create a folder and generate

    validationError = function () {
      if (!region) {
				return 'AWS region is missing. please specify with --region';
			}
      if (options['folder'] && fsUtil.isDir(path.join(source, options['folder']))) {
        return 'An folder with the same name exists in this folder';
      }
      if (!apiActions) {
        return 'Template actions are missing. please specify with "--actions crud" or some of the "c","r","u","d" letters for action types';
      }
      if (apiActions.length > 4) {
        return 'Invalid Actions for your application template. Please specify with "--actions crud" or some of the "c","r","u","d" letters for action types';
      }
      if (!options['endpoints']) {
        return 'Endpoint names for your application template are missing. please specify with "--endpoints users" or a list of endpoint names like "--endpoints products,users"';
      }
    },
    generateProject = function (projectPath) {
      let prepareFolder = options['folder'] ? fsUtil.makeDir(projectPath) : Promise.resolve()
      let endpoints = options['endpoints'].split(',')

      return prepareFolder
        .then(() => fsUtil.copy(path.join(__dirname, '../app-templates/api.js'), path.join(projectPath, 'index.js')))
        .then(() => {
          return apiActions.indexOf('c') == -1 ? Promise.resolve() :
            commandUtil.genRoute('../app-templates/dynamo/api-create.js', endpoints[0], projectPath)
        })
        .then(() => {
          return apiActions.indexOf('r') == -1 ? Promise.resolve() :
            commandUtil.genRoute('../app-templates/dynamo/api-read.js', endpoints[0], projectPath)
        })
        .then(() => {
          return apiActions.indexOf('u') == -1 ? Promise.resolve() :
            commandUtil.genRoute('../app-templates/dynamo/api-update.js', endpoints[0], projectPath)
        })
        .then(() => {
          return apiActions.indexOf('d') == -1 ? Promise.resolve() :
            commandUtil.genRoute('../app-templates/dynamo/api-delete.js', endpoints[0], projectPath)
        })
        
        .then(commandUtil.genPackage(projectPath, region, !!options.dynamodb))
        .then(() => options.dynamodb ? commandUtil.genPolicies(projectPath) : Promise.resolve())
        .then(() => options.dynamodb ? commandUtil.createTable(endpoints[0], region) : Promise.resolve())
        .then(() => {
          console.log('success')
          return Promise.resolve()
      })
    };

  if (validationError()){
    return Promise.reject(validationError());
  }

  return generateProject(projectPath)
}