import express from "express"
import validationResource from "../middlewares/validationResource"
import { upload } from "../middlewares/multer"
import { createTaskSchema, deleteTaskSchema, getAllTasksSchema, getTaskSchema, updateTaskSchema } from "../schemas/task.schema"
import { GetTask, UpdateTask } from "../models/task.model"
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/task.controller"

const router = express.Router()

router.post("/create", upload.none(), validationResource(createTaskSchema), createTask)
router.put("/update/:taskId", upload.none(), validationResource(updateTaskSchema), updateTask)
router.delete("/delete/:taskId", validationResource(deleteTaskSchema), deleteTask)
router.get("/:taskId", validationResource(getTaskSchema), getTask)
router.get("/", validationResource(getAllTasksSchema), getAllTasks)

export default router
