import { JwtPayload } from "jsonwebtoken";

export interface tokenServiseInteface {
    createToken: (payload:object) => string,
    verifyToken: (token:string) => JwtPayload | string
}