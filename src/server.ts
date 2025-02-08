import http from "node:http";
import { serverConfiguration } from "./config";
import { MEHTODS_ENUM } from "./types";
import authController from "./controller/auth.controller";
import todoController from "./controller/todo.controller";
import { checkToken } from "./models/checkToken";
const { port } = serverConfiguration;


const server = http.createServer(async (req, res) => {
    let reqUrl = (req.url as string).trim().toLocaleLowerCase();
    let reqMethod = (req.method as string).trim().toUpperCase();

    res.setHeader("Content-Type", "application/json");
    if(reqUrl.startsWith('/api')){
        if(reqUrl.startsWith("/api/auth/register") && reqMethod == MEHTODS_ENUM.CREATE) return authController.register(req,res);
        if(reqUrl.startsWith("/api/auth/login") && reqMethod == MEHTODS_ENUM.CREATE) return authController.login(req,res); 
        if(await checkToken(req, res)){
            if(reqUrl.startsWith("/api/todo/all") && reqMethod == MEHTODS_ENUM.READ) return todoController.getTodos(req,res);
            if(reqUrl.startsWith("/api/todo/only") && reqMethod == MEHTODS_ENUM.READ) return todoController.getTodo(req,res);
            if(reqUrl.startsWith("/api/todo/create") && reqMethod == MEHTODS_ENUM.CREATE) return todoController.createTodo(req,res);
            if(reqUrl.startsWith("/api/todo/delete") && reqMethod == MEHTODS_ENUM.DELETE) return todoController.deleteTodo(req,res);
            if(reqUrl.startsWith("/api/todo/update") && reqMethod == MEHTODS_ENUM.UPDATE) return todoController.updateTodo(req,res);
            if(reqUrl.startsWith("/api/profile/update") && reqMethod == MEHTODS_ENUM.UPDATE) return todoController.updateProfile(req,res);
            if(reqUrl.startsWith("/api/todo/search") && reqMethod == MEHTODS_ENUM.READ) return todoController.searchTodo(req,res);
        }

        
        
    } else return res.end(JSON.stringify({message: "Invalid URL", status: 404}));
});


server.listen(port, ()=> console.log(`Server runnig on port-${port}`))