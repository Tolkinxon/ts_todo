"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoValidator = exports.loginValidator = exports.registerValidator = void 0;
const error_1 = require("./error");
let emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
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
    if (!(emailRegExp.test(email)))
        throw new error_1.CliesntError('This email is incorrect', 400);
    if (!(passwordRegex.test(password)))
        throw new error_1.CliesntError('This password is incorrect', 400);
    return true;
};
exports.registerValidator = registerValidator;
const loginValidator = (user) => {
    const { password, email } = user;
    if (!password)
        throw new error_1.CliesntError('Password is required!', 400);
    if (!email)
        throw new error_1.CliesntError('Email is required!', 400);
    if (!(emailRegExp.test(email)))
        throw new error_1.CliesntError('This email is incorrect', 400);
    if (!(passwordRegex.test(password)))
        throw new error_1.CliesntError('This password is incorrect', 400);
    return true;
};
exports.loginValidator = loginValidator;
const todoValidator = (todo) => {
    const { isComplete, message } = todo;
    if (isComplete == undefined)
        throw new error_1.CliesntError('Complate is required!', 400);
    if (!message)
        throw new error_1.CliesntError('Message is required!', 400);
    return true;
};
exports.todoValidator = todoValidator;
