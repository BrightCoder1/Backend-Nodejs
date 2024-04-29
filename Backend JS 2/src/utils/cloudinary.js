import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERET,
});


const uploadCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfull
        console.log("File Upload on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);//remove the locally saved temporary file as the uploaded operation got filed
        console.log("File Not Uploaded",error)
        return null;
    }
}

export {uploadCloudinary};
