export enum MEHTODS_ENUM {
    CREATE = "POST",
    READ = 'GET',
    UPDATE = 'PUT',
    DELETE = 'DELETE'
}

export interface ServerConfig {
    port: number | string
}

export type Error = {
    message: string,
    status: number
} 

export type User = {
    id?:number,
    first_name?:string,
    last_name?:string,
    password: string,
    email: string
}