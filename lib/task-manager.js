'use strict'

module.exports = {
  createTaskManager
}

/** @type { (taskManagerService: ITaskManagerService, params: ICreateTaskManagerParams) => ITaskManager } */
function createTaskManager (taskManagerService, params) {
  /** @type { ITaskManager } */
  return new TaskManager(taskManagerService, params)
}

class TaskManager {
  /** @param { ICreateTaskManagerParams } params */
  /** @param { ITaskManagerService } taskManagerService */
  constructor (taskManagerService, params) {
    this.taskManagerService = taskManagerService
    this.type = params.type
    this.name = params.name
    this.queue = params.queue
    this.workers = params.workers
    this.fnTimeout = params.fnTimeout
    this.verifyParams = params.verifyParams
    this.fn = params.fn
  }

  /** @type { () => Promise<ITask[]> } */
  async listTasks () {
    return []
  }

  /** @type { (id: string) => null | Promise<ITask> } */
  async getTask (id) {
    return null
  }

  /** @type { (task: ITask) => Promise<void> } */
  async updateTask (task) {
  }

  /** @type { (id: string) => Promise<void> } */
  async deleteTask (id) {
  }

  /** @type { (task: ITask) => Promise<ITask> } */
  async queueTask (task) {
    return Object.assign({}, task, { id: '???' })
  }

  /** @type { () => Promise<IScheduledTask[]> } */
  async listScheduledTasks () {
    return []
  }

  /** @type { (task: IScheduledTask) => Promise<IScheduledTask> } */
  async createScheduledTask (task) {
    return Object.assign({}, task, { id: '???' })
  }

  /** @type { (id: string) => Promise<null | IScheduledTask> } */
  async getScheduledTask (id) {
    return null
  }

  /** @type { (task: IScheduledTask) => Promise<void> } */
  async updateScheduledTask (task) {
  }

  /** @type { (id: string) => Promise<void> } */
  async deleteScheduledTask (id) {
  }

  suspend () {
  }

  resume () {
  }

  isSuspended () {
    return true
  }

  getStats () {
    return {
      start: new Date(),
      end: new Date(),
      queued: 0,
      executed: 0,
      succeeded: 0,
      failed: 0
    }
  }
}

/** @typedef { import("./types").ITask } ITask */
/** @typedef { import("./types").IScheduledTask } IScheduledTask */
/** @typedef { import("./types").ITaskManager } ITaskManager */
/** @typedef { import("./types").ICreateTaskManagerParams } ICreateTaskManagerParams */
/** @typedef { import("./types").ITaskManagerService } ITaskManagerService */
