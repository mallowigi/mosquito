import {IDocument} from "./IDocument";
export interface IUser {
    name: string
    addFriend(user: IUser);
    removeFriend(user: IUser);
    friends:IUser[];
    documents: IDocument[];
}
