import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (localFilePath: string, story?: boolean) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            upload_preset: story ? "sociialstory": "sociial"
        })

        fs.unlinkSync(localFilePath)

        return response

    } catch (err) {
        console.log("Error occured while uploading to cloudinary\n", err)
        fs.unlinkSync(localFilePath)
    }
}

const deleteFromCloudinary = async (cloudFileLink: string) => {
    try {
        if (!cloudFileLink) return null

        const urlArray = cloudFileLink.split("/")
        const publicId = urlArray[urlArray?.length - 1].split(".")[0]

        const response = await cloudinary.uploader.destroy(`sociial/${publicId}`)

        if (response?.result === "ok") return true

    } catch (err) {
        console.log("Error occured while deleting from cloudinary\n", err)
        return false
    }
}


export { uploadToCloudinary, deleteFromCloudinary }