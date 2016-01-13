import {IUser} from "./IUser";
import {IComment} from "./IComment";
/**
 * Created by helio on 13/01/2016.
 */
export interface IDocument {
    title: string,
    id: number,
    author: IUser,
    created: Date,
    updated: Date,
    imageUrl?: string,
    likes: number,
    comments: IComment[]
}
