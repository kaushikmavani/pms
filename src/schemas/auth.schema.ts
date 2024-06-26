import { TypeOf, z } from "zod"
import config from "../config/app.config"

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: config.messages.emailRequired }).email({ message: config.messages.invalidEmail }),
    password: z.string({ required_error: config.messages.passwordRequired }).min(6, { message: config.messages.passwordMinSix }),
  }),
})

export const signUpSchema = z.object({
  body: z.object({
    name: z.string({ required_error: config.messages.nameRequired }),
    email: z.string({ required_error: config.messages.emailRequired }).email({ message: config.messages.invalidEmail }),
    password: z.string({ required_error: config.messages.passwordRequired }).min(6, { message: config.messages.passwordMinSix }),
  }),
})

export type loginSchemaType = TypeOf<typeof loginSchema>
export type signUpSchemaType = TypeOf<typeof signUpSchema>
