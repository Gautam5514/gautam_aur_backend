import { apiError } from "../utils/apiError.1";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";



// Replace the position of (if any of the async is not use then we use the (_) => res )
export const verifyJWT = asyncHandler(async(req, _ , next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if(!token) {
            throw new apiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user) {
            throw new apiError(401, "Invalid Access Token")
        }

        req.user = user
        next()

    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Access Token")
    }
});