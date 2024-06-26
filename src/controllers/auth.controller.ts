import { errorResponse, successResponse } from "../utils/responseHandler"
import { Request, Response } from "express"
import { loginSchemaType, signUpSchemaType } from "../schemas/auth.schema"
import { AppDataSource } from "../config/db.config"
import { CreateUser, GetUser, IsExistUserByEmail } from "../models/user.model"
import config from "../config/app.config"
import { IsMatchPassword } from "../utils/hash"
import { generateToken } from "../utils/jwt"

export const login = async (req: Request<{}, {}, loginSchemaType["body"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const { email, password } = req.body

    const user = await GetUser({ email })
    if (!user) {
      return await errorResponse(res, 400, config.messages.emailNotRegistered)
    }

    if (!IsMatchPassword(password, user.password)) {
      return await errorResponse(res, 400, config.messages.invalidPassword)
    }

    const token = generateToken({ userId: user.id })

    const data = {
      user,
      token,
    }

    await qr.commitTransaction()

    return successResponse(res, 200, config.messages.loginSuccessful, data)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}

export const signup = async (req: Request<{}, {}, signUpSchemaType["body"]>, res: Response) => {
  const qr = AppDataSource.createQueryRunner()
  await qr.startTransaction()

  try {
    const { name, email, password } = req.body

    const user = await IsExistUserByEmail({ email })
    if (user) {
      return await errorResponse(res, 400, config.messages.emailAlreadyRegistered)
    }

    const newUser = await CreateUser(qr, {
      name,
      email,
      password,
    })

    const token = generateToken({ userId: newUser.id })

    const data = {
      user: newUser,
      token,
    }

    await qr.commitTransaction()

    return successResponse(res, 200, config.messages.signupSuccessful, data)
  } catch (error: any) {
    await qr.rollbackTransaction()
    return errorResponse(res, 500, error.message)
  } finally {
    await qr.release()
  }
}
