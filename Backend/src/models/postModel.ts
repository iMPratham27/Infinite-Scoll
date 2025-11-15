import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    post: string;
    createdAt: string;
    updatedAt: string;
}

const postSchema = new Schema<IPost>({
    post: {
        type: String,
        required: true
    }
},{ timestamps: true });

export const postModel = mongoose.model<IPost>("post", postSchema);