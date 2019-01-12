"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_storage_cloudinary_1 = __importDefault(require("multer-storage-cloudinary"));
const config_1 = __importDefault(require("config"));
cloudinary_1.default.config({
    cloud_name: config_1.default.get("CLOUD_NAME"),
    api_key: config_1.default.get("CLOUDINARY_API_KEY"),
    api_secret: config_1.default.get("CLOUDINARY_SECRET")
});
const storage = multer_storage_cloudinary_1.default({
    cloudinary: cloudinary_1.default,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
exports.parser = multer_1.default({ storage: storage });
//# sourceMappingURL=gymUploadHelper.js.map