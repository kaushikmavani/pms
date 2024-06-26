import express from "express"
import { upload } from "../middlewares/multer"
import validationResource from "../middlewares/validationResource"
import { login, signup } from "../controllers/auth.controller"
import { loginSchema, signUpSchema } from "../schemas/auth.schema"

const router = express.Router()

router.post("/login", upload.none(), validationResource(loginSchema), login)
router.post("/signup", upload.none(), validationResource(signUpSchema), signup)

export default router
