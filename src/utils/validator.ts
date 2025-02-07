import { emit } from "node:process";
import { User } from "../types"
import { CliesntError } from "./error";


let emailRegExp:RegExp =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


export const registerValidator = (user:User) => {
    const {first_name, last_name, password, email} = user;

    if(!first_name) throw new CliesntError('Firsname is required!', 400);
    if(!last_name) throw new CliesntError('Lastname is required!', 400);
    if(!password) throw new CliesntError('Password is required!', 400);
    if(!email) throw new CliesntError('Email is required!', 400);
    if(!(emailRegExp.test(email))) throw new CliesntError('This email is incorrect', 400);
    if(!(passwordRegex.test(password))) throw new CliesntError('This password is incorrect', 400);

    return true
}

export const loginValidator = (user:User) => {
    const {password, email} = user;
   
    if(!password) throw new CliesntError('Password is required!', 400);
    if(!email) throw new CliesntError('Email is required!', 400);
    if(!(emailRegExp.test(email))) throw new CliesntError('This email is incorrect', 400);
    if(!(passwordRegex.test(password))) throw new CliesntError('This password is incorrect', 400);

    return true
}