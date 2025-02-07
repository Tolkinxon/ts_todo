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
const readFile_1 = require("./../models/readFile");
const jwt_1 = require("../lib/jwt/jwt");
const { createToken } = jwt_1.tokenServise;
class TodosController extends controller_dto_1.Todos {
    getTodos(req, res) { }
    constructor() {
        super();
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield (0, readFile_1.readFile)("users.json");
                return res.end(JSON.stringify(users));
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
}
exports.default = new TodosController;
