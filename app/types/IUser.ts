import {IDocument} from "./IDocument";
export interface IUser {
    name: string,
    id: number,
    avatar?: string,
    addFriend(user: IUser);
    removeFriend(user: IUser);
    friends:IUser[];
    documents: IDocument[];
}
