import { Request, Response } from "express"
import { createProjectSchemaType, deleteProjectSchemaType, getAllProjectsSchemaType, getProjectSchemaType, updateProjectSchemaType } from "../schemas/project.schema"
import { errorResponse, successResponse } from "../utils/responseHandler"
import { ProjectInput } from "../entity/project"
import config from "../config/app.config"
import { CreateProject, DeleteProject, GetAllProjects, GetProject, UpdateProject } from "../models/project.model"
import { AppDataSource } from "../config/db.config"

export const getAllProjects = async (req: Request<{}, {}, {}, getAllProjectsSchemaType["query"]>, res: Response) => {
  try {
    const page = req.query.page ?? 1
    const limit = req.query.limit ?? 10

    const [projects, count] = await GetAllProjects(page, limit)

    const data = {
      totalRecords: count,
      projects,
    }

    return successResponse(res, 200, config.messages.getAllProjectsSuccessful, data)
  } catch (error: any) {
    return errorResponse(res, 500, error.message)
  }
}

export const getProject = async (req: Request<getProjectSchemaType["params"]>, res: Response) => {
  try {
    const projectId = Number(req.params.projectId)

    const project = await GetProject({ id: projectId })
    if (!project) {
      return errorResponse(res, 500, config.messages.invalidProjectId)
    }

    return successResponse(res, 200, config.messages.getProjectSuccessful, project)
  } catch (error: any) {
    return errorResponse(res, 500, error.message)
  }
}

export const creareProject = async (req: Request<{}, {}, createProjectSchemaType["body"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const { name, description } = req.body

    const data: ProjectInput = {
      name,
      description,
    }

    const project = await CreateProject(qr, data)

    await qr.commitTransaction()

    return successResponse(res, 201, config.messages.projectCreatedSuccessful, project)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}

export const updateProject = async (req: Request<updateProjectSchemaType["params"], {}, updateProjectSchemaType["body"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const projectId = Number(req.params.projectId)
    const { name, description } = req.body

    const project = await GetProject({ id: projectId })
    if (!project) {
      return errorResponse(res, 500, config.messages.invalidProjectId)
    }

    project.name = name
    project.description = description

    await UpdateProject(qr, project)

    await qr.commitTransaction()

    return successResponse(res, 200, config.messages.projectUpdatedSuccessful, project)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}

export const deleteProject = async (req: Request<deleteProjectSchemaType["params"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const projectId = Number(req.params.projectId)

    const project = await GetProject({ id: projectId })
    if (!project) {
      return errorResponse(res, 500, config.messages.invalidProjectId)
    }

    await DeleteProject(qr, project)

    await qr.commitTransaction()

    return successResponse(res, 200, config.messages.projectDeletedSuccessful, project)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}
