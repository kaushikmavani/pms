import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodError } from "zod"
import { errorResponse } from "../utils/responseHandler"

export default (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      req.body = parsedData.body
      req.query = parsedData.query
      req.params = parsedData.params

      return next()
    } catch (error: any) {
      console.log("error", error)
      if (error instanceof ZodError) {
        return await errorResponse(res, 422, error.errors[0].message)
      }
      return await errorResponse(res, 500, error.message)
    }
  }
}
