import { IncomingMessage, ServerResponse } from "http";
import { Auth } from "./controller.dto";
import { Error, User } from "../types";
import { globalError } from "../utils/error";
import { registerValidator } from "../utils/validator";

class AuthController extends Auth {
    login(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    register(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}

    constructor(){
        super()
        this.register = async (req, res) => {
            try{
                let newUser:string = '';
                req.on('data', (chunk)=>{
                    newUser += chunk
                })
                req.on('end',()=>{
                    try {
                        let user:User = JSON.parse(newUser);
                        const validator = registerValidator(user);
                        console.log(validator)
                        return res.end(JSON.stringify({status: 'success'}))
                        
                    } catch (error) {
                        let err:Error = {
                            message: (error as Error).message, 
                            status: (error as Error).status
                        }
                        globalError(res, err)
                    }
                })
            }
            catch(error){
                let err:Error = {
                    message: (error as Error).message, 
                    status: (error as Error).status
                }
                globalError(res, err)
            }
        }
        this.login = async () => {}
    }
}

export default new AuthController