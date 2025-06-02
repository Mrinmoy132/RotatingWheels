import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    coverPhoto: {
        type: String,
        required: true,
        default: "/images/default_profile.jpg",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    owner:{
        type: String,
    },
    eventDate:{
        type: Date,
        required: true,
    },
    youtubeLink: {
        type: String,
        required: true,
      },

}, { timestamps: true });

export const Blog = mongoose.model("blog", blogSchema);