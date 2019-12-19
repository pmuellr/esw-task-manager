export interface ITaskManagerService {
  listTaskManagers(): Promise<ITaskManager<any, any>[]>
  createTaskManager<Params, Result>(
    params: ICreateTaskManagerParams<Params, Result>
  ): ITaskManager<Params, Result>
  getTaskManager<Params, Result>(type: string): null | Promise<ITaskManager<Params, Result>>
  updateTaskManager(params: IUpdateTaskManagerParams): Promise<void>
  deleteTaskManager(type: string): Promise<void>

  getAllScheduledTasks(): Promise<IScheduledTask<any>[]>
  deleteAllScheduledTasks(): Promise<void>
}

export interface ITaskManager<Params, Result> {
  listTasks(): Promise<ITask<Params>[]>
  queueTask(task: ITask<Params>): Promise<ITask<Params>>
  getTask(id: String): null | Promise<ITask<Params>>
  updateTask(task: ITask<Params>): Promise<void>
  deleteTask(id: string): Promise<void>

  listScheduledTasks(): Promise<IScheduledTask<Params>[]>
  createScheduledTask(
    task: IScheduledTask<Params>,
  ): Promise<IScheduledTask<Params>>
  getScheduledTask(id: String): null | Promise<IScheduledTask<Params>>
  updateScheduledTask(task: IScheduledTask<Params>): Promise<void>
  deleteScheduledTask(id: string): Promise<void>

  suspend(): void
  resume(): void
  isSuspended(): boolean

  getStats(): ITaskManagerStats
}

export interface ITask<Params> {
  id: string
  priority: number
  params: Params
}

export type Schedule = { interval: string } | { cron: string }

export interface IScheduledTask<Params> extends ITask<Params> {
  schedule: Schedule
}

export interface ICreateTaskManagerParams<Params, Result> {
  type: string
  name: string
  workers: number
  fnTimeout: number
  verifyParams(params: Params): Promise<Params>
  fn(params: Params): Promise<Result>
}

export interface IUpdateTaskManagerParams {
  type: string
  name: string
  workers: number
  fnTimeout: number
}

export interface ITaskManagerStats {
  start: Date
  end: Date
  queued: number
  executed: number
  succeeded: number
  failed: number
}
