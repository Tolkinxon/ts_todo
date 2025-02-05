"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_dto_1 = require("./controller.dto");
const error_1 = require("../utils/error");
const validator_1 = require("../utils/validator");
class AuthController extends controller_dto_1.Auth {
    login(req, res) { }
    register(req, res) { }
    constructor() {
        super();
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let newUser = '';
                req.on('data', (chunk) => {
                    newUser += chunk;
                });
                req.on('end', () => {
                    try {
                        let user = JSON.parse(newUser);
                        const validator = (0, validator_1.registerValidator)(user);
                        console.log(validator);
                        return res.end(JSON.stringify({ status: 'success' }));
                    }
                    catch (error) {
                        let err = {
                            message: error.message,
                            status: error.status
                        };
                        (0, error_1.globalError)(res, err);
                    }
                });
            }
            catch (error) {
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        });
        this.login = () => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new AuthController;
