"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class userService {
    static async list() {
        const users = await user_model_1.default.find({});
        return users;
    }
    static async find(user) {
        return await user_model_1.default.findOne({ username: user });
    }
    static async create(user) {
        return await user_model_1.default.create(user);
    }
    static async update(username, user) {
        return await user_model_1.default.update({ username }, user);
    }
    static async delete(username) {
        return await user_model_1.default.findOneAndDelete({ username: username });
    }
}
exports.default = userService;
