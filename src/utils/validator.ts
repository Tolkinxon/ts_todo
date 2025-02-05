import { User } from "../types"
import { CliesntError } from "./error";

export const registerValidator = (user:User) => {
    const {first_name, last_name, password, email} = user;

    if(!first_name) throw new CliesntError('Firsname is required!', 400);
    if(!last_name) throw new CliesntError('Lastname is required!', 400);
    if(!password) throw new CliesntError('Password is required!', 400);
    if(!email) throw new CliesntError('Email is required!', 400);


    return true
}