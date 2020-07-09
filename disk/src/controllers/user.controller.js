"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_1 = __importDefault(require("../utils/auth"));
class UserController {
    static list() {
        return user_service_1.default.list();
    }
    static find(req) {
        let username = req.params.username;
        return user_service_1.default.find(username);
    }
    static create(req) {
        let user = {
            ...req.body
        };
        Promise.resolve(auth_1.default.hashPassword(user.password)).then((result) => {
            user.password = result;
        });
        return user_service_1.default.create(user);
    }
    static update(req) {
        if (req.body.password === undefined) {
            return user_service_1.default.update(req.params.username, req.body);
        }
        else {
            const password = auth_1.default.hashPassword(req.body.password);
            return user_service_1.default.update(req.params.username, {
                password: password
            });
        }
    }
    static delete(req) {
        return user_service_1.default.delete(req.params.username);
    }
}
exports.default = UserController;
