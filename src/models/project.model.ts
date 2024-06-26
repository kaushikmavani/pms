import { FindOptionsWhere, QueryRunner } from "typeorm"
import { Project, ProjectInput } from "../entity/project"
import { AppDataSource } from "../config/db.config"

export const GetAllProjects = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  return await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .leftJoinAndSelect("project.tasks", "tasks")
    .orderBy("project.id", "DESC")
    .skip(skip)
    .take(limit)
    .getManyAndCount()
}

export const GetProject = async (where: FindOptionsWhere<Project>) => {
  return await Project.findOneBy(where)
}

export const CreateProject = async (qr: QueryRunner, data: ProjectInput) => {
  const { name, description } = data

  const newProject = Project.create({
    name,
    description,
  })

  return await qr.manager.save(newProject)
}

export const UpdateProject = async (qr: QueryRunner, project: Project) => {
  return await qr.manager.save(project)
}

export const DeleteProject = async (qr: QueryRunner, project: Project) => {
  return await qr.manager.remove(Project, project)
}
