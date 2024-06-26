import { DataSource } from "typeorm"
import config from "./app.config"
import { Project } from "../entity/project"
import { Task } from "../entity/task"
import { User } from "../entity/user"

export const AppDataSource = new DataSource({
  type: config.db.type as "postgres" | "mysql",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: true,
  entities: [Project, Task, User],
})

export default async () => {
  try {
    await AppDataSource.initialize()
  } catch (err) {
    console.error("Error during Data Source initialization", err)
    process.exit(1)
  }
}
