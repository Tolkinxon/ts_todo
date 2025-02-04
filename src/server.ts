import http from "node:http";
import {config} from "dotenv";
config();
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    let reqUrl = (req.url as string).trim().toLocaleLowerCase();
    let reqMethod = (req.method as string).trim().toUpperCase();


    
});


server.listen(PORT, ()=> console.log(`Server runnig on port-${PORT}`))