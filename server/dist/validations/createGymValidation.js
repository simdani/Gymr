"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmptyValidation_1 = require("./isEmptyValidation");
function validateCreateGym(data) {
    let errors = {};
    data.name = !isEmptyValidation_1.isEmpty(data.name) ? data.name : "";
    data.city = !isEmptyValidation_1.isEmpty(data.city) ? data.city : "";
    data.description = !isEmptyValidation_1.isEmpty(data.description) ? data.description : "";
    data.website = !isEmptyValidation_1.isEmpty(data.website) ? data.website : "";
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "Name is required!";
    }
    if (validator_1.default.isEmpty(data.city)) {
        errors.city = "City is required!";
    }
    if (validator_1.default.isEmpty(data.description)) {
        errors.description = "Description is required!";
    }
    if (validator_1.default.isEmpty(data.website)) {
        errors.website = "Website is required!";
    }
    return {
        errors,
        isValid: isEmptyValidation_1.isEmpty(errors)
    };
}
exports.validateCreateGym = validateCreateGym;
//# sourceMappingURL=createGymValidation.js.map