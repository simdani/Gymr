"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmptyValidation_1 = require("./isEmptyValidation");
function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmptyValidation_1.isEmpty(data.email) ? data.email : "";
    data.password = !isEmptyValidation_1.isEmpty(data.password) ? data.password : "";
    if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmptyValidation_1.isEmpty(errors)
    };
}
exports.validateLoginInput = validateLoginInput;
//# sourceMappingURL=loginValidation.js.map