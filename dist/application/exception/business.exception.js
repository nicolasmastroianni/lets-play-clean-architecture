"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
class BusinessException {
    constructor(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=business.exception.js.map