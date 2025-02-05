import http from "node:http";
import { serverConfiguration } from "./config";
import { MEHTODS_ENUM } from "./types";
import authController from "./controller/auth.controller";
const { port } = serverConfiguration;


const server = http.createServer((req, res) => {
    let reqUrl = (req.url as string).trim().toLocaleLowerCase();
    let reqMethod = (req.method as string).trim().toUpperCase();

    res.setHeader("Content-Type", "application/json");
    if(reqUrl.startsWith('/api')){
        if(reqUrl.startsWith("/api/auth/register") && reqMethod == MEHTODS_ENUM.CREATE){
            authController.register(req,res)
        } 

        
        
    } else return res.end(JSON.stringify({message: "Invalid URL", status: 404}));
});


server.listen(port, ()=> console.log(`Server runnig on port-${port}`))