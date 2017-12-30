import {row, rows, empty} from '../config/db';


export function readByEmail(email: string): Promise<models.IUser>{
    return row ('GetUserByEmail', [email]);
}
export function all(): Promise<Array<models.IUser>>{
    return rows('GetUsers');
}
export function read(id: number): Promise<models.IUser>{
    return row('GetUser',[id]);
}
export function create(user : any, email: string,firstname: string, lastname: string ):Promise<models.IUser>{
    return row ('InsertUser');
}