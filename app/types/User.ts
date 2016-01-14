/**
 * Created by helio on 08/01/2016.
 */
import * as R from "ramda"
import * as _ from "lodash"

import {Injectable} from "angular2/core";
import {IUser} from "../types/IUser";
import {IDocument} from "./IDocument";

export class User implements IUser {
    id: number;
    public documents: IDocument[];
    public friends: Array<IUser>;
    public name: string;


    constructor(data: IUser) {
        _.extend(this, data);
    }

    addFriend(friend: IUser): IUser {
        this.friends.push(friend);
        return friend;
    }

    removeFriend(friend: IUser): IUser {
        return R.without([friend], this.friends);
    }
}
