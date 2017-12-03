'use strict'

const path = require('path')
const fs = require('fs')

module.exports = function readCommands(commandsRelativePath) {
  const result = {}
  fs.readdirSync(path.join(__dirname, commandsRelativePath)).forEach(fileName => {
    const cmdName = path.basename(fileName, '.js')
    result[cmdName] = require(`${commandsRelativePath}/${cmdName}`)
    result[cmdName].command = cmdName
  })
  return result;
}