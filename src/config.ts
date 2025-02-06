import {config} from "dotenv";
import { ServerConfig } from "./types";
import path from "path";
config();

export const serverConfiguration:ServerConfig = {
    port: process.env.PORT || 5000,
    dbFilePath: (fileName: string) => path.resolve('db', fileName)
}