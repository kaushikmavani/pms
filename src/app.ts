import express from "express"
import cors from "cors"
import router from "./routers/index.router"
import errorHandler from "./utils/errorHandler"

const app = express()

const whiteList = ["http://localhost:5173"]

app.use(cors({ origin: whiteList, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "views")

app.use("/api", router)

errorHandler()

export { app }
