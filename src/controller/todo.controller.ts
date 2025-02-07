import { IncomingMessage, ServerResponse } from "http";
import { Todos } from "./controller.dto";
import { Error, Todo, User } from "../types";
import { CliesntError, globalError, ServerError } from "../utils/error";
import { readFileTodos, readFile } from "./../models/readFile";
import { writeFileTodos, writeFile } from "./../models/writeFile";
import { todoValidator, registerValidator } from "../utils/validator";
import { TokenBody } from "../lib/jwt/jwt.dto";
import { tokenServise } from "../lib/jwt/jwt";


class TodosController extends Todos {
    getTodos(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    getTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    createTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    deleteTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    updateTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    updateProfile(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}

    constructor(){
        super()
        this.getTodos = async (req, res) => {
            try{
                let todos:Todo[] = await readFileTodos("todos.json"); 
                return res.end(JSON.stringify(todos))
            } catch(error){
                let err:Error = {
                    message: (error as Error).message, 
                    status: (error as Error).status
                }
                globalError(res, err)
            }
        }

        this.createTodo = async (req, res) => {
            try{
                let newTodo:string = '';
                req.on('data', (chunk)=>{
                    newTodo += chunk
                })
                req.on('end', async ()=>{
                    try {
                        let todo:Todo = JSON.parse(newTodo);
                        const validator = todoValidator(todo);
                        if(validator){
                            let todos:Todo[] = await readFileTodos("todos.json");
                            const token = req.headers.token;
                            let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;
                            todo = {id: todos.length ? (((todos as Todo[]).at(-1) as Todo).id as number) + 1 : 1,
                            user_id: (verifyToken.user_id as number),     
                            ...todo};
                            todos.push(todo);    
                            let write:boolean = await writeFileTodos('todos.json', todos);
                            
                            if(write) return res.end(JSON.stringify({message: 'User todo added successfully !', status: 201}))
                            else throw new ServerError('Todo not saved!')
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

        this.deleteTodo = async (req, res) => {
            try{
                let reqUrl:string = (req.url as string).trim().toLocaleLowerCase();

                let todo_id:number = Number(reqUrl.split('/').at(-1));
                if(isNaN(todo_id) || todo_id == 0) throw new CliesntError('Set id of todo', 400);

                const token = req.headers.token;
                let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;
                
                let todos:Todo[] = await readFileTodos("todos.json"); 

                todos = todos.filter((item:Todo) => !(item.user_id == verifyToken.user_id && item.id == todo_id));
                
                let write:boolean = await writeFileTodos('todos.json', todos);
                if(write) return res.end(JSON.stringify({message: 'User todo deleted successfully !', status: 201}))
                else throw new ServerError('Todo not saved!')

            } catch(error){
                let err:Error = {
                    message: (error as Error).message, 
                    status: (error as Error).status
                }
                globalError(res, err)
            }
        }

        this.updateTodo = async (req, res) => {
            try{
                let newTodo:string = '';
                req.on('data', (chunk)=>{
                    newTodo += chunk
                })
                req.on('end', async ()=>{
                    try {
                        let todo:Todo = JSON.parse(newTodo);
                        const validator = todoValidator(todo);
                        if(validator){
                            let reqUrl:string = (req.url as string).trim().toLocaleLowerCase();

                            let todo_id:number = Number(reqUrl.split('/').at(-1));
                            if(isNaN(todo_id) || todo_id == 0) throw new CliesntError('Set id of todo', 400);
            
                            const token = req.headers.token;
                            let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;
                            
                            let todos:Todo[] = await readFileTodos("todos.json"); 
            
                            let todoIndex = todos.findIndex((item:Todo) => item.user_id == verifyToken.user_id && item.id == todo_id);
                            

                            todos[todoIndex] = {...todos[todoIndex], ...todo};

                            let write:boolean = await writeFileTodos('todos.json', todos);
                            
                            if(write) return res.end(JSON.stringify({message: 'User todo added successfully !', status: 201}))
                            else throw new ServerError('Todo not saved!')
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

        this.getTodo = async (req, res) => {
            try{
                let reqUrl:string = (req.url as string).trim().toLocaleLowerCase();

                let todo_id:number = Number(reqUrl.split('/').at(-1));
                if(isNaN(todo_id) || todo_id == 0) throw new CliesntError('Set id of todo', 400);
                let todos:Todo[] = await readFileTodos("todos.json"); 
                let todoIndex = todos.findIndex((item:Todo) => item.id == todo_id);
                return res.end(JSON.stringify(todos[todoIndex]))
            } catch(error){
                let err:Error = {
                    message: (error as Error).message, 
                    status: (error as Error).status
                }
                globalError(res, err)
            }
        }

        this.updateProfile = async (req, res) => {
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
                            let reqUrl:string = (req.url as string).trim().toLowerCase();

                            let todo_id:number = Number(reqUrl.split('/').at(-1));
                            if(isNaN(todo_id) || todo_id == 0) throw new CliesntError('Set id of todo', 400);
            
                            const token = req.headers.token;
                            let verifyToken:TokenBody = tokenServise.verifyToken(token as string) as TokenBody;
                            
                            if(todo_id != verifyToken.user_id) throw new CliesntError("You have no access to change data another user!", 400)

                            let users:User[] = await readFile("users.json"); 
            
                            let todoIndex = users.findIndex((item:User) => item.id == verifyToken.user_id);

                            users[todoIndex] = {...users[todoIndex], ...user};

                            let write:boolean = await writeFile('users.json', users);
                            
                            if(write) return res.end(JSON.stringify({message: 'User updated successfully !', status: 201}))
                            else throw new ServerError('Todo not saved!')
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

        


    }
}

export default new TodosController