import {Injectable} from "angular2/core";
import {IUser} from "../types/IUser";
import {IDocument} from "../types/IDocument";
/**
 * Created by helio on 13/01/2016.
 */

@Injectable()
export class UserData {
    public friends: IUser[];
    public documents: IDocument[];

    constructor() {
        this.friends = [];
        this.documents = [];
    }
}
