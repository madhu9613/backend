import { asyncHandler } from "../utils/asynchandeler.js";
import {ApiError} from "../utils/apierror.js" 
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from("../utils/cloudinary.js")
import {ApiResponse} from "../utils/apiresponse.js"

const registerUser = asyncHandler(async (req, res) => {
   

   const {fullname,userdata,email,password}=req.body
   console.log("email:",email);
   
if (
    [fullname,email,username,password].some((field)=>
    field?.trim()===""
    )
) {
    throw new ApiError(400,"all field required")    
}

const existedUser=User.findOne({
    $or:[{ username },{email }]
})

if(existedUser)
{
    throw new ApiError(409,"user already existed")
}

const avatarLocalpath= req.files?.avatar[0]?.path;
const coverImageLocalpath=req.files?.coverimage?.path;

if(!avatarLocalpath)
{
    throw new ApiError(400,"avatar is requied")
    
}

const avatar=await uploadOnCloudinary(avatarLocalpath)  
const coverImage=await uploadOnCloudinary(coverImageLocalpath)

if(!avatar)
{
    throw new ApiError(400,"avatar is not found> upload it")

}
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase(),

})

const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser)
{
    throw new ApiError(500,"something went wrong while registring the user ")
}
return res.status(201).json(
    new ApiResponse(200,createdUser,"user generated")
)

});


export { registerUser };