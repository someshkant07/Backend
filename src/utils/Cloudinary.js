import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("Cloudinary Cloud Name: ", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("Cloudinary API Key: ", process.env.CLOUDINARY_API_KEY);
// console.log("Cloudinary API Secret: ", process.env.CLOUDINARY_API_SECRET);

export const uploadOnCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error: ", error);
        return reject(error);
      }
      resolve(result);
    });
  });
};
