import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {uploadCloudinary} from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // Register Info
  // Step1 : get info from database
  // step2 : validation for checking(not empty)
  //step3: user already exist
  //step4: fheck for images, check for avatar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullname, email, username, password } = req.body;

  if (fullname == "") {
    throw new ApiError(400, "Full name is required");
  }

  if (
    [fullname, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const userExist = User.findOne({
    $or: [{ username }, { email }],
  });
  if(userExist){
    throw new ApiError(409,"User Already Exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400,"Avatar required");
  }

  const user =await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if(!createdUser){
    throw new ApiError(500, "Something want wrong");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser, "User register successfully")
  )
  console.log(createdUser);
  console.log(user);
});

export { registerUser };
