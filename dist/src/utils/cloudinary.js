"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadToCloudinary = (localFilePath, story) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!localFilePath)
            return null;
        const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: "auto",
            upload_preset: story ? "sociialstory" : "sociial"
        });
        fs_1.default.unlinkSync(localFilePath);
        return response;
    }
    catch (err) {
        console.log("Error occured while uploading to cloudinary\n", err);
        fs_1.default.unlinkSync(localFilePath);
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = (cloudFileLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!cloudFileLink)
            return null;
        const urlArray = cloudFileLink.split("/");
        const publicId = urlArray[(urlArray === null || urlArray === void 0 ? void 0 : urlArray.length) - 1].split(".")[0];
        const response = yield cloudinary_1.v2.uploader.destroy(`sociial/${publicId}`);
        if ((response === null || response === void 0 ? void 0 : response.result) === "ok")
            return true;
    }
    catch (err) {
        console.log("Error occured while deleting from cloudinary\n", err);
        return false;
    }
});
exports.deleteFromCloudinary = deleteFromCloudinary;
