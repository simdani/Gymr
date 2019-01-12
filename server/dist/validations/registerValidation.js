"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmptyValidation_1 = require("./isEmptyValidation");
function validateRegisterInput(data) {
    let errors = {};
    data.username = !isEmptyValidation_1.isEmpty(data.username) ? data.username : "";
    data.email = !isEmptyValidation_1.isEmpty(data.email) ? data.email : "";
    data.password = !isEmptyValidation_1.isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmptyValidation_1.isEmpty(data.password2) ? data.password2 : "";
    if (!validator_1.default.isLength(data.username, { min: 1, max: 30 })) {
        errors.username = "UserName must be between 1 and 30 characters";
    }
    if (data.email.includes("gmail")) {
        errors.email = "Users with gmail account, use Google Login!";
    }
    if (validator_1.default.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password field is required";
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmptyValidation_1.isEmpty(errors)
    };
}
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=registerValidation.js.map