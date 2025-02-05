"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const config_1 = require("./config");
const types_1 = require("./types");
const auth_controller_1 = __importDefault(require("./controller/auth.controller"));
const { port } = config_1.serverConfiguration;
const server = node_http_1.default.createServer((req, res) => {
    let reqUrl = req.url.trim().toLocaleLowerCase();
    let reqMethod = req.method.trim().toUpperCase();
    res.setHeader("Content-Type", "application/json");
    if (reqUrl.startsWith('/api')) {
        if (reqUrl.startsWith("/api/auth/register") && reqMethod == types_1.MEHTODS_ENUM.CREATE) {
            auth_controller_1.default.register(req, res);
        }
    }
    else
        return res.end(JSON.stringify({ message: "Invalid URL", status: 404 }));
});
server.listen(port, () => console.log(`Server runnig on port-${port}`));
