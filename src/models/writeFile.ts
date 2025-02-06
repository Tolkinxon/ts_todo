import fs from "node:fs/promises";
import { User } from "../types";
import { serverConfiguration } from "../config";
const { dbFilePath } = serverConfiguration

export const writeFile = async (fileName:string, users:User[]):Promise<boolean> => {
    await fs.writeFile(dbFilePath(fileName), JSON.stringify(users, null, 4));
    return true;
}   