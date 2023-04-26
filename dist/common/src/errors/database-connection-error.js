"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class DatabaseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super("db connection error");
        this.statusCode = 500;
    }
    generateErrors() {
        return [{ message: "db connection error" }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
