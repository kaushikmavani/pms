import { TypeOf, z } from "zod"
import config from "../config/app.config"
import { TASK_PRIORITY, TASK_STATUS } from "../entity/task"

const prioritySchema = z.union([z.literal(TASK_PRIORITY.HIGH), z.literal(TASK_PRIORITY.MEDIUM), z.literal(TASK_PRIORITY.LOW)])
const statusSchema = z.union([z.literal(TASK_STATUS.TO_DO), z.literal(TASK_STATUS.IN_PROGRESS), z.literal(TASK_STATUS.COMPLETED)])

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: config.messages.titleRequired }),
    priority: z.coerce
      .number({ required_error: config.messages.proirityRequired, invalid_type_error: config.messages.invalidPriority })
      .refine((val) => prioritySchema.safeParse(val).success, { message: config.messages.invalidPriority }),
    status: z.coerce
      .number({ required_error: config.messages.statusRequired, invalid_type_error: config.messages.invalidStatus })
      .refine((val) => statusSchema.safeParse(val).success, { message: config.messages.invalidStatus }),
    projectId: z.coerce.number({ required_error: config.messages.projectIdRequired, invalid_type_error: config.messages.invalidProjectId }),
  }),
})

export const updateTaskSchema = z.object({
  params: z.object({
    taskId: z.string({ required_error: config.messages.taskIdRequired }),
  }),
  body: z.object({
    title: z.string({ required_error: config.messages.titleRequired }),
    priority: z.coerce
      .number({ required_error: config.messages.proirityRequired, invalid_type_error: config.messages.invalidPriority })
      .refine((val) => prioritySchema.safeParse(val).success, { message: config.messages.invalidPriority }),
    status: z.coerce
      .number({ required_error: config.messages.statusRequired, invalid_type_error: config.messages.invalidStatus })
      .refine((val) => statusSchema.safeParse(val).success, { message: config.messages.invalidStatus }),
    projectId: z.coerce.number({ required_error: config.messages.projectIdRequired, invalid_type_error: config.messages.invalidProjectId }),
  }),
})

export const deleteTaskSchema = z.object({
  params: z.object({
    taskId: z.string({ required_error: config.messages.taskIdRequired }),
  }),
})

export const getTaskSchema = z.object({
  params: z.object({
    taskId: z.string({ required_error: config.messages.taskIdRequired }),
  }),
})

export const getAllTasksSchema = z.object({
  query: z.object({
    page: z.coerce.number({ invalid_type_error: config.messages.invalidPage }).optional(),
    limit: z.coerce.number({ invalid_type_error: config.messages.invalidLimit }).optional(),
  }),
})

export type createTaskSchemaType = TypeOf<typeof createTaskSchema>
export type updateTaskSchemaType = TypeOf<typeof updateTaskSchema>
export type deleteTaskSchemaType = TypeOf<typeof deleteTaskSchema>
export type getTaskSchemaType = TypeOf<typeof getTaskSchema>
export type getAllTasksSchemaType = TypeOf<typeof getAllTasksSchema>
