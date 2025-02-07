import { IncomingMessage, ServerResponse } from "http";
import { Todos } from "./controller.dto";
import { Error, User } from "../types";
import { CliesntError, globalError, ServerError } from "../utils/error";
import { readFile } from "./../models/readFile";
import { writeFile } from "./../models/writeFile";
import { tokenServise } from "../lib/jwt/jwt";
const { createToken } = tokenServise;

class TodosController extends Todos {
    getTodos(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    constructor(){
        super()
        this.getTodos = async (req, res) => {
            try{
                let users:User[] = await readFile("users.json"); 
                return res.end(JSON.stringify(users))
            } catch(error){
                let err:Error = {
                    message: (error as Error).message, 
                    status: (error as Error).status
                }
                globalError(res, err)
            }
        }
    }
}

export default new TodosController