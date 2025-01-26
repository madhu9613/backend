import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

 // Configuration
 cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET_KEY 
});

//why async function because want to upload the file in cloudinary and it will take time thats whay i am taking async
const uploadOnCloudinary= async (localpath)=>{{
    try {
        if(!localpath) return null;

       const response= await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
        console.log("file has been uploaded on cloudinary",response.url);
        return response; 
        
    } catch (error) {
        fs.unlinkSync(localpath) //i donot want to save not uploaded file here
        return null;
        
    }

}}

export {uploadOnCloudinary} 