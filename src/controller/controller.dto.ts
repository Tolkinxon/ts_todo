import { IncomingMessage, ServerResponse } from "http";

type Request = IncomingMessage;
type Response = ServerResponse<Request>;

export abstract class Auth {
    abstract register(req:Request, res:Response): void;
    abstract login(req:Request, res:Response): void;
}