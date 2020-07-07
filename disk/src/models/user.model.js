"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    address: String,
    email: String,
    phone: String,
    roles: String,
}, { timestamps: true });
/**
 * Password hash middleware.
 */
// userSchema.pre("save", function save(next) {
//     const user = this as IUser;
//     if (!user.isModified("password")) { return next(); }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) { return next(err); }
//         bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
//             if (err) { return next(err); }
//             user.password = hash;
//             next();
//         });
//     });
// });
// const comparePassword: comparePasswordFunction = function (this: IUser, candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
//         cb(err, isMatch);
//     });
// };
//userSchema.methods.comparePassword = comparePassword;
var UserCollection = mongoose_1.default.model("user", userSchema);
exports.default = UserCollection;
