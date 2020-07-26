import mongoose from "mongoose";

export type IComment = mongoose.Document & {
    username: String,
    comment: String,
    rate: Number,
    idproduct: String,
    type: String,
    time: String
};

const commentSchema = new mongoose.Schema(
    {
        username: String,
        idproduct: String,
        type: String,
        comment: String,
        rate: Number,
        time: String
    },
    { timestamps: true }
);

const CommentCollection = mongoose.model<IComment>("comment", commentSchema);
export default CommentCollection;
