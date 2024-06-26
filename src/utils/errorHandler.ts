import { Request, Response } from "express"
import { errorResponse } from "./responseHandler"
import config from "../config/app.config"
import { app } from "../app"

export default () => {
  // handle error (which is not handled inside and unfortunately retured)
  app.use(async (error: any, req: Request, res: Response) => {
    if (!error.status || error.status === 500) {
      return await errorResponse(res, 500, config.messages.unexpectedError)
    } else {
      return await errorResponse(res, error.status, error.message)
    }
  })

  // handle 404
  app.use(async (req: Request, res: Response) => {
    return await errorResponse(res, 404, config.messages.invalidEndpointOrMethod)
  })
}
