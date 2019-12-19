'use strict'

module.exports = {
  runCLI
}

const meow = require('meow')

/** @type { (indexName: string) => Promise<void> } */
async function runStart (indexName) {
  logError('runStart under construction')
}

/** @type { (indexName: string) => Promise<void> } */
async function runQueue (indexName) {
  logError('runQueue under construction')
}

/** @type { (indexName: string, id: string, intervalMS: number) => Promise<void> } */
async function runSked (indexName, id, intervalMS) {
  logError('runSked under construction')
}

/** @type { (indexName: string, id: string) => Promise<void> } */
async function runUnsked (indexName, id) {
  logError('runUnsked under construction')
}

/** @type { (indexName: string) => Promise<void> } */
async function runList (indexName) {
  logError('runList under construction')
}

/** @type { (argv: string[]) => Promise<void> } */
async function runCLI (argv) {
  const cliOptions = meow(getHelp(), {
    argv,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
        default: false
      }
    }
  })

  if (cliOptions.flags.help || cliOptions.input.length === 0) {
    console.log(getHelp())
    process.exit(1)
  }

  const [indexName, action, id, intervalMSstring] = cliOptions.input
  let intervalMS

  if (indexName == null) logError('indexName parameter missing')
  if (action == null) logError('action parameter missing')

  switch (action) {
    case 'start':
      return runStart(indexName)
    case 'queue':
      return runQueue(indexName)
    case 'sked':
      if (id == null) logError('id parameter missing')
      if (intervalMSstring == null) logError('intervalMSstring parameter missing')
      intervalMS = parseInterval(intervalMSstring)
      return runSked(indexName, id, intervalMS)
    case 'unsked':
      if (id == null) logError('id parameter missing')
      return runUnsked(indexName, id)
    case 'list':
      return runList(indexName)
    default:
      logError(`invalid action parameter: ${action}`)
  }
}

/** @type { (message: string) => number } */
function parseInterval (intervalMSstring) {
  if (intervalMSstring == null) logError('intervalMS parameter missing')
  const intervalMS = parseInt(intervalMSstring, 10)
  if (isNaN(intervalMS)) logError(`invalid intervalMS parameter: ${intervalMSstring}`)
  return intervalMS
}

function getHelp () {
  return `
esw-task-manager <indexName> start
esw-task-manager <indexName> queue
esw-task-manager <indexName> sked <id> <intervalMS>
esw-task-manager <indexName> unsked <id>
esw-task-manager <indexName> list

Runs a task-manager with the specified index
  `.trim()
}

/** @type { (message: string) => void } */
function logError (message) {
  console.log(message)
  process.exit(1)
}
