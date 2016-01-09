/**
 * Created by helio on 08/01/2016.
 */
import * as R from "ramda"

import {Injectable} from "angular2/core";
@Injectable()
export class User {
    public friends: Array<User>;

    constructor() {
        this.friends = [];
    }

    addFriend(friend: User): User {
        this.friends.push(friend);
        return friend;
    }

    removeFriend(friend: User): User {
        return R.without([friend], this.friends);
    }

    parseData(data: User) {
        this.friends = data.friends;
    }
}
