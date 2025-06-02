import mongoose, {Schema} from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    blogID:{
        type: Schema.Types.ObjectId,
        ref: "blog",
    }
}, { timestamps: true });

export const Comment = mongoose.model("comment", commentSchema);