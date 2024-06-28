import mongoose, {Schema} from "mongoose";

const VideoSchema = new Schema(
    {
        videoFile: {
            type: String, // Cloudnary url
            required: true
        },
        thumbnail: {
            type: String, // Cloudnary url
            required: true
        },
        title: {
            type: String, // Cloudnary url
            required: true
        }
    },
    {
        timestamps : true
    }
)

export const Video = mongoose.model("Video", VideoSchema)