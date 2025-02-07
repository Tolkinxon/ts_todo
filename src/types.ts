export enum MEHTODS_ENUM {
    CREATE = "POST",
    READ = 'GET',
    UPDATE = 'PUT',
    DELETE = 'DELETE'
}

export interface ServerConfig {
    port: number | string,
    dbFilePath: (fileName:string) => string
}

export type Error = {
    message: string,
    status: number
} 

export type Todo = {
    id?:number,
    user_id?:number,
    message:string,
    isComplete:boolean,
}

export type User = {
    id?:number,
    first_name?:string,
    last_name?:string,
    password: string,
    email: string
};

