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
const writeFile_1 = require("./../models/writeFile");
const validator_1 = require("../utils/validator");
const jwt_1 = require("../lib/jwt/jwt");
class TodosController extends controller_dto_1.Todos {
    getTodos(req, res) { }
    createTodo(req, res) { }
    deleteTodo(req, res) { }
    updateTodo(req, res) { }
    constructor() {
        super();
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let todos = yield (0, readFile_1.readFileTodos)("todos.json");
                return res.end(JSON.stringify(todos));
            }
            catch (error) {
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let newTodo = '';
                req.on('data', (chunk) => {
                    newTodo += chunk;
                });
                req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let todo = JSON.parse(newTodo);
                        const validator = (0, validator_1.todoValidator)(todo);
                        if (validator) {
                            let todos = yield (0, readFile_1.readFileTodos)("todos.json");
                            const token = req.headers.token;
                            let verifyToken = jwt_1.tokenServise.verifyToken(token);
                            todo = Object.assign({ id: todos.length ? todos.at(-1).id + 1 : 1, user_id: verifyToken.user_id }, todo);
                            todos.push(todo);
                            let write = yield (0, writeFile_1.writeFileTodos)('todos.json', todos);
                            if (write)
                                return res.end(JSON.stringify({ message: 'User todo added successfully !', status: 201 }));
                            else
                                throw new error_1.ServerError('Todo not saved!');
                        }
                        return res.end(JSON.stringify({ message: "success" }));
                    }
                    catch (error) {
                        let err = {
                            message: error.message,
                            status: error.status
                        };
                        (0, error_1.globalError)(res, err);
                    }
                }));
            }
            catch (error) {
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let reqUrl = req.url.trim().toLocaleLowerCase();
                let todo_id = Number(reqUrl.split('/').at(-1));
                if (isNaN(todo_id) || todo_id == 0)
                    throw new error_1.CliesntError('Set id of todo', 400);
                const token = req.headers.token;
                let verifyToken = jwt_1.tokenServise.verifyToken(token);
                let todos = yield (0, readFile_1.readFileTodos)("todos.json");
                todos = todos.filter((item) => !(item.user_id == verifyToken.user_id && item.id == todo_id));
                let write = yield (0, writeFile_1.writeFileTodos)('todos.json', todos);
                if (write)
                    return res.end(JSON.stringify({ message: 'User todo deleted successfully !', status: 201 }));
                else
                    throw new error_1.ServerError('Todo not saved!');
            }
            catch (error) {
                let err = {
                    message: error.message,
                    status: error.status
                };
                (0, error_1.globalError)(res, err);
            }
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let newTodo = '';
                req.on('data', (chunk) => {
                    newTodo += chunk;
                });
                req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let todo = JSON.parse(newTodo);
                        const validator = (0, validator_1.todoValidator)(todo);
                        if (validator) {
                            let reqUrl = req.url.trim().toLocaleLowerCase();
                            let todo_id = Number(reqUrl.split('/').at(-1));
                            if (isNaN(todo_id) || todo_id == 0)
                                throw new error_1.CliesntError('Set id of todo', 400);
                            const token = req.headers.token;
                            let verifyToken = jwt_1.tokenServise.verifyToken(token);
                            let todos = yield (0, readFile_1.readFileTodos)("todos.json");
                            let todoIndex = todos.findIndex((item) => item.user_id == verifyToken.user_id && item.id == todo_id);
                            todos[todoIndex] = Object.assign(Object.assign({}, todos[todoIndex]), todo);
                            let write = yield (0, writeFile_1.writeFileTodos)('todos.json', todos);
                            if (write)
                                return res.end(JSON.stringify({ message: 'User todo added successfully !', status: 201 }));
                            else
                                throw new error_1.ServerError('Todo not saved!');
                            res.end(JSON.stringify({ message: 'User todo updated successfully !', status: 201 }));
                        }
                        return res.end(JSON.stringify({ message: "success" }));
                    }
                    catch (error) {
                        let err = {
                            message: error.message,
                            status: error.status
                        };
                        (0, error_1.globalError)(res, err);
                    }
                }));
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
