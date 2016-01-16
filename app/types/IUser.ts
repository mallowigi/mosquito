import {IDocument} from "./IDocument";
export interface IUser {
    name: string,
    id: number,
    avatar?: string,
    friends?:IUser[];
    documents?: IDocument[];
}
