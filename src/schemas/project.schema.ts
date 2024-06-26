import { TypeOf, z } from "zod"
import config from "../config/app.config"

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string({ required_error: config.messages.nameRequired }),
    description: z.string({ required_error: config.messages.descriptionRequired }),
  }),
})

export const updateProjectSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: config.messages.projectIdRequired }),
  }),
  body: z.object({
    name: z.string({ required_error: config.messages.nameRequired }),
    description: z.string({ required_error: config.messages.descriptionRequired }),
  }),
})

export const deleteProjectSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: config.messages.projectIdRequired }),
  }),
})

export const getProjectSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: config.messages.projectIdRequired }),
  }),
})

export const getAllProjectsSchema = z.object({
  query: z.object({
    page: z.coerce.number({ invalid_type_error: config.messages.invalidPage }).optional(),
    limit: z.coerce.number({ invalid_type_error: config.messages.invalidLimit }).optional(),
  }),
})

export type createProjectSchemaType = TypeOf<typeof createProjectSchema>
export type updateProjectSchemaType = TypeOf<typeof updateProjectSchema>
export type deleteProjectSchemaType = TypeOf<typeof deleteProjectSchema>
export type getProjectSchemaType = TypeOf<typeof getProjectSchema>
export type getAllProjectsSchemaType = TypeOf<typeof getAllProjectsSchema>
