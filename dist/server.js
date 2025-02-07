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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const config_1 = require("./config");
const types_1 = require("./types");
const auth_controller_1 = __importDefault(require("./controller/auth.controller"));
const todo_controller_1 = __importDefault(require("./controller/todo.controller"));
const checkToken_1 = require("./models/checkToken");
const { port } = config_1.serverConfiguration;
const server = node_http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqUrl = req.url.trim().toLocaleLowerCase();
    let reqMethod = req.method.trim().toUpperCase();
    res.setHeader("Content-Type", "application/json");
    if (reqUrl.startsWith('/api')) {
        if (reqUrl.startsWith("/api/auth/register") && reqMethod == types_1.MEHTODS_ENUM.CREATE)
            return auth_controller_1.default.register(req, res);
        if (reqUrl.startsWith("/api/auth/login") && reqMethod == types_1.MEHTODS_ENUM.CREATE)
            return auth_controller_1.default.login(req, res);
        if (yield (0, checkToken_1.checkToken)(req, res)) {
            if (reqUrl.startsWith("/api/todo/all") && reqMethod == types_1.MEHTODS_ENUM.READ)
                return todo_controller_1.default.getTodos(req, res);
            if (reqUrl.startsWith("/api/todo/only") && reqMethod == types_1.MEHTODS_ENUM.READ)
                return todo_controller_1.default.getTodo(req, res);
            if (reqUrl.startsWith("/api/todo/create") && reqMethod == types_1.MEHTODS_ENUM.CREATE)
                return todo_controller_1.default.createTodo(req, res);
            if (reqUrl.startsWith("/api/todo/delete") && reqMethod == types_1.MEHTODS_ENUM.DELETE)
                return todo_controller_1.default.deleteTodo(req, res);
            if (reqUrl.startsWith("/api/todo/update") && reqMethod == types_1.MEHTODS_ENUM.UPDATE)
                return todo_controller_1.default.updateTodo(req, res);
            if (reqUrl.startsWith("/api/profile/update") && reqMethod == types_1.MEHTODS_ENUM.UPDATE)
                return todo_controller_1.default.updateProfile(req, res);
        }
    }
    else
        return res.end(JSON.stringify({ message: "Invalid URL", status: 404 }));
}));
server.listen(port, () => console.log(`Server runnig on port-${port}`));
