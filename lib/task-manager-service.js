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
    /** @type { Map<string, ITaskManager> } */
    this.taskManagers = new Map()
  }

  /** @ttype { () => Promise<ITaskManager<any, any>[]>} */
  async listTaskManagers () {
    return []
  }

  /** @type { (params: ICreateTaskManagerParams) => ITaskManager } */
  createTaskManager (params) {
    return taskManager.createTaskManager(this, params)
  }

  /** @type { (type: string) => Promise<null | ITaskManager> } */
  async getTaskManager (type) {
    return null
  }

  /** @type { (params: IUpdateTaskManagerParams) => Promise<void> } */
  async updateTaskManager (params) {
  }

  /** @type { (type: string) => Promise<void> } */
  async deleteTaskManager (type) {
  }

  /** @type { () => Promise<IScheduledTask[]> } */
  async getAllScheduledTasks () {
    return []
  }

  /** @type { () => Promise<void> } */
  async deleteAllScheduledTasks () {
  }
}

/** @typedef { import("./types").ITaskManagerService } ITaskManagerService */
/** @typedef { import("./types").ITaskManager } ITaskManager */
/** @typedef { import("./types").ICreateTaskManagerParams } ICreateTaskManagerParams */
/** @typedef { import("./types").IUpdateTaskManagerParams } IUpdateTaskManagerParams */
/** @typedef { import("./types").IScheduledTask } IScheduledTask */
