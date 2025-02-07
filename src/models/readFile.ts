import fs from "node:fs/promises";
import { User, Todo } from "../types";
import { serverConfiguration } from "../config";
const { dbFilePath } = serverConfiguration

export const readFile = async (fileName:string):Promise<[] | User[]> => {
    let read:User[] | string = await fs.readFile(dbFilePath(fileName), 'utf-8');
    return read ? JSON.parse(read) : [];
}   

export const readFileTodos = async (fileName:string):Promise<[] | Todo[]> => {
    let read: string | Todo[] = await fs.readFile(dbFilePath(fileName), 'utf-8');
    return read ? JSON.parse(read) : [];
} 

  

