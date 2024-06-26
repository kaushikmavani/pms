import { Response } from "express"
import config from "../config/app.config"

export type SendableResponse = {
  status: number
  message: string
  data?: unknown
}

export const errorResponse = async (res: Response, code: number, message: string) => {
  try {
    console.error(message)
    const response: SendableResponse = {
      status: 0,
      message: message,
    }

    const sendableResponse = await prepareResponse(JSON.stringify(response))
    return res.status(code).json(sendableResponse)
  } catch (error: any) {
    const response: SendableResponse = {
      status: 0,
      message: config.messages.somethingWrong,
    }
    return res.status(500).json(response)
  }
}

export const successResponse = async (res: Response, code: number, message: string, data?: unknown) => {
  try {
    let response: SendableResponse = {
      status: 1,
      message,
    }
    if (data && data != null) {
      response.data = data
    }

    const sendableResponse = await prepareResponse(JSON.stringify(response))
    return res.status(code).json(sendableResponse)
  } catch (error: any) {
    return await errorResponse(res, 500, error.message)
  }
}

async function prepareResponse(respnse: string) {
  return await deepConverter(JSON.parse(respnse))
}

async function deepConverter(object: Record<string, any>): Promise<Record<string, any>> {
  const entries = Object.entries(object).map(([key, value]) => {
    const newValue = (value === "" || value == null) && typeof value != "boolean" ? "" : value
    return [key, newValue]
  })

  const converted = await Promise.all(
    entries.map(async ([key, value]) => {
      if (Array.isArray(value)) {
        const convertedValue = await deepConverter(value)
        return [key, Object.values(convertedValue)]
      }

      if (typeof value == "object") {
        const convertedValue = await deepConverter(value)
        return [key, convertedValue]
      }

      return [key, value]
    })
  )

  return Object.fromEntries(converted)
}
