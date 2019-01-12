"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmptyValidation_1 = require("./isEmptyValidation");
function updateGymReviewValidation(data) {
    let errors = {};
    data.text = !isEmptyValidation_1.isEmpty(data.text) ? data.text : "";
    if (validator_1.default.isEmpty(data.text)) {
        errors.text = "Review is required!";
    }
    return {
        errors,
        isValid: isEmptyValidation_1.isEmpty(errors)
    };
}
exports.updateGymReviewValidation = updateGymReviewValidation;
//# sourceMappingURL=updateGymReviewValidation.js.map