import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler"
import config from "../config/app.config"
import { AppDataSource } from "../config/db.config"
import { GetProject } from "../models/project.model"
import { TaskInput } from "../entity/task"
import { createTaskSchemaType, deleteTaskSchemaType, getAllTasksSchemaType, getTaskSchemaType, updateTaskSchemaType } from "../schemas/task.schema"
import { CreateTask, DeleteTask, GetAllTasks, GetTask, UpdateTask } from "../models/task.model"

export const getAllTasks = async (req: Request<{}, {}, {}, getAllTasksSchemaType["query"]>, res: Response) => {
  try {
    const page = req.query.page ?? 1
    const limit = req.query.limit ?? 10

    const [tasks, count] = await GetAllTasks(page, limit)

    const data = {
      totalRecords: count,
      tasks,
    }

    return successResponse(res, 200, config.messages.getAllTasksSuccessful, data)
  } catch (error: any) {
    return errorResponse(res, 500, error.message)
  }
}

export const getTask = async (req: Request<getTaskSchemaType["params"]>, res: Response) => {
  try {
    const taskId = Number(req.params.taskId)

    const task = await GetTask({ id: taskId })
    if (!task) {
      return errorResponse(res, 500, config.messages.invalidTaskId)
    }

    return successResponse(res, 200, config.messages.getTaskSuccessful, task)
  } catch (error: any) {
    return errorResponse(res, 500, error.message)
  }
}

export const createTask = async (req: Request<{}, {}, createTaskSchemaType["body"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const { title, priority, status, projectId } = req.body

    const project = await GetProject({ id: projectId })
    if (!project) {
      return errorResponse(res, 500, config.messages.invalidProjectId)
    }

    const data: TaskInput = {
      title,
      priority,
      status,
      project,
    }

    const task = await CreateTask(qr, data)

    await qr.commitTransaction()

    return successResponse(res, 201, config.messages.taskCreatedSuccessful, task)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}

export const updateTask = async (req: Request<updateTaskSchemaType["params"], {}, updateTaskSchemaType["body"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const taskId = Number(req.params.taskId)
    const { title, priority, status, projectId } = req.body

    const task = await GetTask({ id: taskId })
    if (!task) {
      return errorResponse(res, 500, config.messages.invalidTaskId)
    }

    task.title = title
    task.priority = priority
    task.status = status

    if (projectId) {
      const project = await GetProject({ id: projectId })
      if (!project) {
        return errorResponse(res, 500, config.messages.invalidProjectId)
      }

      task.project = project
    }

    await UpdateTask(qr, task)

    await qr.commitTransaction()

    return successResponse(res, 200, config.messages.taskUpdatedSuccessful, task)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}

export const deleteTask = async (req: Request<deleteTaskSchemaType["params"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const taskId = Number(req.params.taskId)

    const task = await GetTask({ id: taskId })
    if (!task) {
      return errorResponse(res, 500, config.messages.invalidTaskId)
    }

    await DeleteTask(qr, task)

    await qr.commitTransaction()

    return successResponse(res, 200, config.messages.taskDeletedSuccessful, task)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}
