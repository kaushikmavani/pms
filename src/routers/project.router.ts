import express from "express"
import { creareProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/project.controller"
import validationResource from "../middlewares/validationResource"
import { createProjectSchema, deleteProjectSchema, getAllProjectsSchema, getProjectSchema, updateProjectSchema } from "../schemas/project.schema"
import { upload } from "../middlewares/multer"

const router = express.Router()

router.post("/create", upload.none(), validationResource(createProjectSchema), creareProject)
router.put("/update/:projectId", upload.none(), validationResource(updateProjectSchema), updateProject)
router.delete("/delete/:projectId", validationResource(deleteProjectSchema), deleteProject)
router.get("/:projectId", validationResource(getProjectSchema), getProject)
router.get("/", validationResource(getAllProjectsSchema), getAllProjects)

export default router
