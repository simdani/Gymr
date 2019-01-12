"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = (value) => value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
//# sourceMappingURL=isEmptyValidation.js.map