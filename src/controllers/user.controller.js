import { apiError } from "../utils/apiError.1.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import { apiResponse } from "../utils/apiResponce.js";

const registerUser = asyncHandler(async( req, res ) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    // process to login user
    // 1. enter the email id and password
    // 2. confirm your password right or wrong
    // 2.1. Enter the mobile number, addresses and phone number
    // 3. Confirm you are right or not
    // 4. Now you are eligible for perform the task

    // Get user detail form fronted
    // Validation - not Empty
    // check if user already exists: username, email
    // check for image, check for avtar
    // uplaod them to cloudnary, avtar
    // create user object - create entry in db
    // remove password  and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password} = req.body
    console.log("email", email);

    // if(fullName === "") {
    //     throw new apiError(400, "fullName is required")
    // }

    // Advanced method & New used method
    // Use of method (some) =  method checks whether at least one element in an array satisfies a provided condition. This is useful when you need to verify if any item in a list meets a specific criterion. 
    if(
        [fullName, email, username, password].some((field) => 
        field ?.trim() === "")
    ) {
        throw new apiError(400, "All the field are required")
    }

    const existedUser =  User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new apiError(409, "User with email or username already exists")
    }

    // Multer is a tool in Node.js used to handle file uploads. When users upload files (like images or documents) through a form on a website, Multer helps process those files and store them on the server.

    const avatarLocalPath =  req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new apiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar) {
        throw new apiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(createdUser) {
        throw new apiError(500, "Something went wrong will registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered successfully")
    )

})

export 
{
    registerUser,

}