import { IncomingMessage, ServerResponse } from "http";
import { CliesntError, globalError } from "../utils/error";
import { Error } from "../types";
import { tokenServise } from "../lib/jwt/jwt";
import { TokenBody } from "../lib/jwt/jwt.dto";
import { readFile } from "./readFile";

export const checkToken = async (req: IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    try{
        const token = req.headers.token;
        if(!token) throw new CliesntError('Unauthorized', 401);
        let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;

        let users = await readFile('users.json');
        if(!(users.some(item => item.id == verifyToken.user_id))) throw new CliesntError('Token is invalid', 401);
        if(!(verifyToken.userAgent == req.headers['user-agent'])) throw new CliesntError('Token is invalid', 401);

        console.log(verifyToken.user_id);
        
        return true;
    }
    catch(error){
                let err:Error = {
                    message: (error as Error).message, 
                    status: (error as Error).status
                }
                globalError(res, err)
    }
}