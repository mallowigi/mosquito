/**
 * Created by helio on 08/01/2016.
 */
import * as _ from "lodash"

import {Injectable} from "angular2/core";
@Injectable()
export class User {
    private friends:Array<User>;

    constructor() {
        this.friends = [];
    }

    addFriend(friend:User):User {
        this.friends.push(friend);
        return friend;
    }

    removeFriend(friend:User):User {
        return _.remove(this.friends, friend);
    }
}
