import mongoose from "mongoose";
export type IUser = mongoose.Document &{
    username: string,
    password: string,
    phone: string,
    name: string
};

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    phone: String,
    name: String
},{timestamps:true});

const UserCollection = mongoose.model<IUser>("user", userSchema);

export default UserCollection;