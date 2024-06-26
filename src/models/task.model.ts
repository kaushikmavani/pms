import { FindOptionsWhere, QueryRunner } from "typeorm"
import { AppDataSource } from "../config/db.config"
import { Task, TaskInput } from "../entity/task"

export const GetAllTasks = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  return await AppDataSource.getRepository(Task)
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.project", "project")
    .orderBy("task.id", "DESC")
    .skip(skip)
    .take(limit)
    .getManyAndCount()
}

export const GetTask = async (where: FindOptionsWhere<Task>) => {
  return await Task.findOne({
    where,
    relations: {
      project: true,
    },
    order: {
      project: {
        id: "DESC",
      },
    },
  })
}

export const IsExistTaskByEmail = async (where: FindOptionsWhere<Task>) => {
  return await Task.existsBy(where)
}

export const CreateTask = async (qr: QueryRunner, data: TaskInput) => {
  const { title, priority, status, project } = data

  const newTask = Task.create({
    title,
    priority,
    status,
    project,
  })

  return await qr.manager.save(newTask)
}

export const UpdateTask = async (qr: QueryRunner, task: Task) => {
  return await qr.manager.save(task)
}

export const DeleteTask = async (qr: QueryRunner, task: Task) => {
  return await qr.manager.remove(Task, task)
}
