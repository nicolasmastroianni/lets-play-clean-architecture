"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAvailableException = void 0;
const generic_exception_1 = require("../../config/generic.exception");
class NotAvailableException extends generic_exception_1.GenericException {
    constructor(response) {
        super(response);
    }
}
exports.NotAvailableException = NotAvailableException;
//# sourceMappingURL=not.available.exception.js.map