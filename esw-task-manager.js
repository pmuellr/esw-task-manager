#!/usr/bin/env node

'use strict'

/** @typedef { import("./lib/types").ITaskManagerService } ITaskManagerService */

const { createTaskManagerService } = require('./lib/task-manager-service')
const { runCLI } = require('./lib/cli')

module.exports = {
  createTaskManagerService
}

// @ts-ignore
if (require.main === module) runCLI(process.argv.slice(2))
