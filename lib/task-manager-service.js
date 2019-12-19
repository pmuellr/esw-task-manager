'use strict'

module.exports = {
  createTaskManagerService
}

const taskManager = require('./task-manager')

/** @type { (esName: string) => ITaskManagerService } */
function createTaskManagerService (esName) {
  /** @type { ITaskManagerService } */
  return new TaskManagerService(esName)
}

class TaskManagerService {
  /** @param { string } esName */
  constructor (esName) {
    this.esName = esName
  }

  async listTaskManagers () {
    return []
  }

  createTaskManager (params) {
    return taskManager.createTaskManager(this, params)
  }

  async getTaskManager (type) {
    return null
  }

  async updateTaskManager (params) {
  }

  async deleteTaskManager (type) {
  }

  async getAllScheduledTasks () {
    return []
  }

  async deleteAllScheduledTasks () {
  }
}

/** @typedef { import("./types").ITaskManagerService } ITaskManagerService */
