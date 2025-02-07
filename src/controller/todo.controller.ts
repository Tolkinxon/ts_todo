import { IncomingMessage, ServerResponse } from "http";
import { Todos } from "./controller.dto";
import { Error, Todo } from "../types";
import { CliesntError, globalError, ServerError } from "../utils/error";
import { readFileTodos } from "./../models/readFile";
import { writeFileTodos } from "./../models/writeFile";
import { todoValidator } from "../utils/validator";
import { TokenBody } from "../lib/jwt/jwt.dto";
import { tokenServise } from "../lib/jwt/jwt";


class TodosController extends Todos {
    getTodos(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    createTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    deleteTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
    updateTodo(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {}
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

                            res.end(JSON.stringify({message: 'User todo updated successfully !', status: 201}))
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