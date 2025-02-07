import { IncomingMessage, ServerResponse } from "http";
import { Auth } from "./controller.dto";
import { Error, User } from "../types";
import { CliesntError, globalError, ServerError } from "../utils/error";
import { loginValidator, registerValidator } from "../utils/validator";
import { readFile } from "./../models/readFile";
import { writeFile } from "./../models/writeFile";
import { tokenServise } from "../lib/jwt/jwt";
const { createToken } = tokenServise;

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
                req.on('end', async ()=>{
                    try {
                        let user:User = JSON.parse(newUser);
                        const validator = registerValidator(user);
                        if(validator){
                            let users:User[] = await readFile("users.json");
                            if(users.some((item:User)=> user.email == item.email)) throw new CliesntError('This user already excist!', 400);

                            user = {id: users.length ? (((users as User[]).at(-1) as User).id as number) + 1 : 1, ...user};
                            users.push(user);    
                            let write:boolean = await writeFile('users.json', users);
                            
                            if(write) return res.end(JSON.stringify({message: 'User successfully added!', status: 201, accessToken:  createToken({user_id: user.id, userAgent: req.headers['user-agent']})}))
                            else throw new ServerError('User not saved!')
                        }
                        return res.end(JSON.stringify({message: "success"}))
                        
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

        this.login = async (req, res) => {
            try{
                let loggedUser:string = '';
                req.on('data', (chunk)=>{
                    loggedUser += chunk
                })
                req.on('end', async ()=>{
                    try {
                        let user:User = JSON.parse(loggedUser);
                        const validator = loginValidator(user as User);
                        if(validator){
                            let users:User[] = await readFile("users.json"); 
                            let findUser = users.find((item:User) => item.email == (user as User).email)
                            if(findUser?.password == (user as User).password) return res.end(JSON.stringify({message: "User successfully logged!", status: 200,accessToken:  createToken({user_id: (findUser as User).id, userAgent: req.headers['user-agent']})}));
                            else throw new CliesntError('User not found', 404);
                        }

                    }catch(error){
                        let err:Error = {
                            message: (error as Error).message, 
                            status: (error as Error).status
                        }
                        globalError(res, err)
                    }})

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

export default new AuthController