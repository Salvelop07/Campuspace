import { Router } from "express";
import { becomeAdmin, loginUser, registerUser } from "../controllers/user.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router()


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/admin").patch(verifyJWT, becomeAdmin)


export default router