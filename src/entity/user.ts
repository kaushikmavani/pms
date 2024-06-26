import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { Project } from "./project"
import { hashPassword, isHashedPassword } from "../utils/hash"

export interface UserInput {
  name: string
  email: string
  password: string
}

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  projects: Project[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const isHashed = isHashedPassword(this.password)
    if (!isHashed) {
      this.password = hashPassword(this.password)
    }
  }
}
