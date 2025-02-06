import { sign, verify } from "jsonwebtoken";
import { tokenServiseInteface } from "./jwt.dto";

export const tokenServise:tokenServiseInteface = {
    createToken: (payload:object) => sign(payload, process.env.TOKEN_KEY as string, {expiresIn: '7d'}) ,
    verifyToken: (token:string) => verify(token, process.env.TOKEN_KEY as string)
}