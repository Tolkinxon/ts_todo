"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfiguration = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
exports.serverConfiguration = {
    port: process.env.PORT || 5000,
    dbFilePath: (fileName) => path_1.default.resolve('db', fileName)
};
