"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const generic_exception_1 = require("../../config/generic.exception");
class NotFoundException extends generic_exception_1.GenericException {
    constructor(response) {
        super(response);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not.found.exception.js.map