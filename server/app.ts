import express from 'express'
import errorHandler from './src/middlewares/error.middleware'

const app = express()

declare module "express" {
    interface Request {
        user?: UserInterface
    }
}

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true, limit: "5mb" }))
app.use(express.static("public"))


import userRouter from "./src/routes/user.route"
import { UserInterface } from './src/models/user.model'



app.use("/api/v1/users", userRouter)


app.use(errorHandler)

export default app