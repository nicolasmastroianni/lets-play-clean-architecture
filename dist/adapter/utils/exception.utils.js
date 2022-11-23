"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = exports.UNHANDLED_REST_EXCEPTION = exports.UNHANDLED_EXCEPTION = exports.getException = void 0;
const getException = (error) => {
    const SEPARATOR = ":";
    const QUANTITY_ELEMENTS_OUTPUT = 2;
    const elements = error
        .toString()
        .split(SEPARATOR, QUANTITY_ELEMENTS_OUTPUT);
    return findFirst(elements);
};
exports.getException = getException;
const findFirst = (list) => {
    return list.find((elem) => typeof elem === "string");
};
exports.UNHANDLED_EXCEPTION = 'UnhandledException';
exports.UNHANDLED_REST_EXCEPTION = -1;
const getStatus = (e) => {
    const error = JSON.stringify(e);
    const errorParsed = JSON.parse(error);
    const { status } = errorParsed;
    return status;
};
exports.getStatus = getStatus;
//# sourceMappingURL=exception.utils.js.map