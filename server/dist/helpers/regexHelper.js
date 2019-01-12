"use strict";
// escape string with regex for fuzzy search.
exports.escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
//# sourceMappingURL=regexHelper.js.map