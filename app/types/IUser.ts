import {User} from "../providers/User";

export interface IUser {
    name: string
    lowerName():string;
    addFriend(user: IUser);
    removeFriend(user: IUser);
    friends:IUser[];
}
