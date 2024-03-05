import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const generateAccessToken = async (userId: string) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        return await user.generateAccessToken()

    } catch (err) {
        console.log(err)
        throw new ApiError(500, "Something went wrong, while generating access and refresh tokens")
    }
}

const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { fullName, email, password, isAdmin } = req.body
        if (!fullName.trim() || !email.trim() || !password.trim()) {
            throw new ApiError(400, "All fields are required")
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            throw new ApiError(400, "User with this email already exists")
        }

        const user = await User.create({
            fullName, email, password
        })

        if (!user) {
            throw new ApiError(400, "Something went wrong, while registering the user")
        }

        const accessToken = await generateAccessToken(user._id.toString())

        res.status(201).json(
            new ApiResponse(201, { user, accessToken }, "User registered successfully")
        )
    })

const loginUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        if (!email.trim() || !password.trim()) {
            throw new ApiError(400, "All fields are required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            throw new ApiError(400, "Invalid email or password")
        }

        const accessToken = await generateAccessToken(user._id.toString())

        res.status(200).json(
            new ApiResponse(200, { user, accessToken }, "User logged in successfully")
        )
    })

const becomeAdmin = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.user) {
            throw new ApiError(401, "User not verified")
        }
        const { _id } = req.user

        const user = await User.findById(_id)
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        if (user.isAdmin) {
            throw new ApiError(400, "User is already an admin")
        }

        user.isAdmin = true
        user.save({ validateBeforeSave: false })

        return res.status(200).json(
            new ApiResponse(200, {}, "User is now an admin")
        )
    })

export {
    registerUser,
    loginUser,
    becomeAdmin
}