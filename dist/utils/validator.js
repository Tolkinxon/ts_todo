"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = void 0;
const error_1 = require("./error");
const registerValidator = (user) => {
    const { first_name, last_name, password, email } = user;
    if (!first_name)
        throw new error_1.CliesntError('Firsname is required!', 400);
    if (!last_name)
        throw new error_1.CliesntError('Lastname is required!', 400);
    if (!password)
        throw new error_1.CliesntError('Password is required!', 400);
    if (!email)
        throw new error_1.CliesntError('Email is required!', 400);
    return true;
};
exports.registerValidator = registerValidator;
