import {row, rows, empty} from '../config/db';  

export function all(): Promise<Array<models.IUser>> {
    return rows('GetPosts',[]); 
}

export function read(id: number): Promise<models.IUser> {
    return row('GetSinglePost', [id]);
}

export function update(id: number, title: string, content: string, categoryid: number) {
    return empty('UpdatePosts', [id, title, content, categoryid]);
}

export function create(id:number, title: string, content: string, userid: number, categoryid: number) {
    return rows('CreatePost', [title, content, userid, categoryid]);
}

export function destroy(id: number) {
    return empty('DeletePost', [id]);
}