import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// STEPS TO FOLLOW FOR BUILDING THE LOGIC BEHIND REGISTERING USER :

// STEP 1 : get user details from frontend
// STEP 2 : validation - not empty
// STEP 3 : check if user is already exists : username , email
// STEP 4 : check for image , check for avatar
// STEP 5 : upload them to cloudinary , avatar
// STEP 6 : create user object - create entry in db
// STEP 7 : remove password and refresh token feild from response
// STEP 8 : check for user creation
// STEP 9 : return res


//step 1

const registerUser = asyncHandler(async (req, res) => {
    const {username , fullName , email , password} = req.body
    console.log("email :" , email);

    //step 2

    if(
        [fullName , email , username , password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400 , "all feilds are cumpulsory")
    }

    //step 3

    const existedUser = User.findOne({
        $or : [{ username } , { email }]
    })
    
    if(existedUser) {
        throw new ApiError(409 , "username/email already exist")
    }

    //step 4

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    // step 5

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400 , "Avatar is required")
    }

    // step 6

    const user = User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    //step 7

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //step 8

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user")
    }

    //step 9

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "user registered successfully")
    )
})

export {registerUser}