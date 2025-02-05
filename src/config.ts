import {config} from "dotenv";
import { ServerConfig } from "./types";
config();

export const serverConfiguration:ServerConfig = {
    port: process.env.PORT || 5000
}