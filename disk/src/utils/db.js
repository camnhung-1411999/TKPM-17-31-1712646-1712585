"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        // this.uri = 'mongodb://' + utils.mongo.user + ':' + utils.mongo.pass + '@' + utils.mongo.host + ':' + utils.mongo.port;
        this.uri = 'mongodb+srv://hoangman:123@cluster0-ascy6.mongodb.net/hoangman?retryWrites=true&w=majority';
        this.onConnection();
    }
    onConnection() {
        this.connection = mongoose_1.default.connection;
        this.connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        this.connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        this.connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo...");
            setTimeout(() => {
                mongoose_1.default.connect(this.uri, {
                    keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000
                });
            }, 3000);
        });
        this.connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });
        this.connection.on("error", (error) => {
            console.log("Mongo Connection Error:" + error);
        });
        const run = async () => {
            await mongoose_1.default.connect(this.uri, {
                keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true
            });
        };
        run().catch(error => console.error(error));
    }
}
exports.default = Database;
