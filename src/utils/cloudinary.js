import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOncloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;

    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    console.log("File uploaded : ", response);

    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary: ", error);

    try {
      fs.unlinkSync(localfilepath);
    } catch (error) {
      console.error("Error deleting local file after upload error: ", error);
    }
    return null;
  }
};

export { uploadOncloudinary };
