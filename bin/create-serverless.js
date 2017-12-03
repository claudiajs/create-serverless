#!/usr/bin/env node

const path = require('path')
const minimist = require('minimist')
const AWS = require('aws-sdk')
const colors = require('colors')
const readCommands = require('../lib/util/read-commands')
const showHelp = require('../lib/help')

function readArgs() {
  return minimist(process.argv.slice(2), {
    alias: { h: 'help',  v: 'version'},
    string: ['region', 'name', 'actions', 'endpoints'],
    boolean: [],
    default: {}
  })
}

function cmd(console) {
  const args = readArgs()
  const commands = readCommands('../commands')
  const command = args._ && args._.length && args._[0]

  if (args.version) {
    return console.log(require(path.join(__dirname, '..', 'package.json')).version)
  }

  if (command && !commands[command]) {
    console.error(`unsupported command ${command}. re-run with --help for usage information`)
    process.exit(1)
    return
  }
  if (args.help) {
    return showHelp()
  }

  if (!command) {
    console.error('command not provided. re-run with --help for usage information')
    process.exit(1)
    return
  }

  if (!AWS.config.credentials) {
    return console.log(`Set AWS credentials first. Guide is available here: http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html`)
  }

  return createServerless(command, commands, args, console)
}

function createServerless(command, commands, args, console) {

  return commands[command](args, console).then(result => {
    if (result) {
      console.log(JSON.stringify(result, null, 2))
    }
    process.exit();
  }).catch(e => {
    console.error(e);
    process.exit(1);
  })
}

if (require.main === module)
  cmd(console)

module.exports = cmd