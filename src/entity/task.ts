import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Project } from "./project"

export const TASK_PRIORITY = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
} as const

export const TASK_STATUS = {
  TO_DO: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
} as const

export interface TaskInput {
  title: string
  priority: number
  status: number
  project: Project
}

@Entity({ name: "tasks" })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    default: 0,
  })
  priority: number

  @Column({
    default: 0,
  })
  status: number

  @Column()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @ManyToOne(() => Project, (project) => project.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  project: Project
}
