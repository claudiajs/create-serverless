'use strict'

const path = require('path'),
  fsUtil = require('../util/fs-util')

module.exports = function deploy(options, optionalLogger) {
  console.log('Initializing deployment process...')

  const source = process.cwd(),
    deployment = fsUtil.fileExists(path.join(source, 'claudia.json')) ?
      fsUtil.runClaudiaUpdate : fsUtil.runClaudiaCreate

  return new Promise((resolve) => {
    deployment()
    resolve('Deployment successful!')
  })
}