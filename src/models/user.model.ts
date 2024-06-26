import { FindOptionsWhere, QueryRunner } from "typeorm"
import { AppDataSource } from "../config/db.config"
import { User, UserInput } from "../entity/user"

export const GetAllUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit

  return await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.projects", "projects")
    .leftJoinAndSelect("projects.tasks", "tasks")
    .orderBy("user.id", "DESC")
    .skip(skip)
    .take(limit)
    .getManyAndCount()
}

export const GetUser = async (where: FindOptionsWhere<User>) => {
  return await User.findOneBy(where)
}

export const IsExistUserByEmail = async (where: FindOptionsWhere<User>) => {
  return await User.existsBy(where)
}

export const CreateUser = async (qr: QueryRunner, data: UserInput) => {
  const { name, email, password } = data

  const newUser = User.create({
    name,
    email,
    password,
  })

  return await qr.manager.save(newUser)
}

export const UpdateUser = async (qr: QueryRunner, user: User) => {
  return await qr.manager.save(user)
}

export const DeleteUser = async (qr: QueryRunner, user: User) => {
  return await qr.manager.remove(User, user)
}
