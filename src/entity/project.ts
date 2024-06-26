import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { Task } from "./task"
import { User } from "./user"

export interface ProjectInput {
  name: string
  description: string
  tasks?: Task[]
}

@Entity({ name: "projects" })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[]

  @ManyToOne(() => User, (user) => user.projects)
  user: User
}
