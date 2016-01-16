import {Injectable} from "angular2/core";
import {IUser} from "../types/IUser";
import {IDocument} from "../types/IDocument";

import * as _ from "lodash";

@Injectable()
export class UserData implements IUser {
    public id: number;
    public name: string;
    public friends: IUser[];
    public documents: IDocument[];

    constructor() {
        this.friends = [];
        this.documents = [];
    }

    load(data) {
        _.merge(this, data);
    }

    isFriend(user: IUser): boolean {
        return _.includes(this.friends, user);
    }

    friend(user: IUser): void {
        if (_.includes(this.friends, user)) {
            _.remove(this.friends, user);
        } else {
            this.friends.push(user);
        }
    }
}
