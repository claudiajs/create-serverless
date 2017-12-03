'use strict'

const path = require('path')
const colors = require('colors')

function showHelp() {
  return console.log(`
	${colors.magenta('Create Serverless')} ✤ ${colors.cyan('Generate and deploy serverless apps ')}
	 ${colors.magenta('Version:')} ${colors.cyan(require(path.join(__dirname, '..', 'package.json')).version)}
	 
	USAGE:
	 ${colors.magenta('create-serverless {options}')}
	 
	AVAILABLE OPTIONS:
	 ${colors.magenta('--help')}        ${colors.cyan('or')} ${colors.magenta('-help')}   Prints this help
	 ${colors.magenta('--version')}     ${colors.cyan('or')} ${colors.magenta('-v')}    Prints the current version
			
			
	More info: ${colors.cyan('https://github.com/simalexan/create-serverless')}
	Changelog/release history: ${colors.cyan('https://github.com/simalexan/create-serverless/releases')}
	`)
}

module.exports = showHelp