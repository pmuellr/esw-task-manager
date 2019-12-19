'use strict'

module.exports = {
  runCLI
}

const meow = require('meow')

const { runStart } = require('./subcommands/start')
const { runQueue } = require('./subcommands/queue')
const { runSked } = require('./subcommands/sked')
const { runUnsked } = require('./subcommands/unsked')
const { runList } = require('./subcommands/list')

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

  const [indexName, subcommand, id, intervalMSstring] = cliOptions.input
  const intervalMS = parseInt(intervalMSstring, 10)

  if (indexName == null) logError('indexName parameter missing')
  if (subcommand == null) logError('subcommand parameter missing')

  try {
    await runSubcommand(subcommand, indexName, id, intervalMS)
  } catch (err) {
    logError(err.message)
  }
}

/** @type { (subcommand: string, indexName: string, id?: string, intervalMS?: number) } */
async function runSubcommand (subcommand, indexName, id, intervalMS) {
  switch (subcommand) {
    case 'start':
      return runStart(indexName)
    case 'queue':
      return runQueue(indexName)
    case 'sked':
      if (id == null) throw new Error('id parameter missing')
      if (isNaN(intervalMS)) throw new Error('intervalMSstring parameter invalid')
      return runSked(indexName, id, intervalMS)
    case 'unsked':
      if (id == null) throw new Error('id parameter missing')
      return runUnsked(indexName, id)
    case 'list':
      return runList(indexName)
    default:
      throw new Error(`invalid subcommand parameter: ${subcommand}`)
  }
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
