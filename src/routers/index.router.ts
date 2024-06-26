import express from "express"
import authRouter from "./auth.router"
import projectRouter from "./project.router"
import taskRouter from "./task.router"

const router = express.Router()

router.use("/auth", authRouter)
router.use("/projects", projectRouter)
router.use("/tasks", taskRouter)

export default router
