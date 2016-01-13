import {IUser} from "./IUser";
/**
 * Created by helio on 13/01/2016.
 */
export interface IComment {
    message: string,
    author: IUser,
    created: Date,
    imageUrl?: string
}
