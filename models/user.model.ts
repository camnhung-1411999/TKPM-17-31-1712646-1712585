import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export type IUser = mongoose.Document & {
    username: string, 
    password:string,
    name:string,
    address:string,
    email:string,
    phone:string,
    roles:string,

};

type comparePasswordFunction = (this: IUser, candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    } ,
    password:String,
    name:String,
    address:String,
    email:String,
    phone:String,
    roles:String,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this as IUser;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (this: IUser, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;


const UserCollection = mongoose.model<IUser>("user", userSchema);

export default UserCollection;
