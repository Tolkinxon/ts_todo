import fs from "node:fs/promises";
import { Todo, User } from "../types";
import { serverConfiguration } from "../config";
const { dbFilePath } = serverConfiguration

export const writeFile = async (fileName:string, users:User[]):Promise<boolean> => {
    await fs.writeFile(dbFilePath(fileName), JSON.stringify(users, null, 4));
    return true;
}  

export const writeFileTodos = async (fileName:string, todos:Todo[]):Promise<boolean> => {
    await fs.writeFile(dbFilePath(fileName), JSON.stringify(todos, null, 4));
    return true;
}  