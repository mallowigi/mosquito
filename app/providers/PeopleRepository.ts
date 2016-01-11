import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import * as R from "ramda";
import * as _ from "lodash";
import {Filters} from "./Filters";
import {IUser} from "../types/IUser";
import {User} from "../types/User";

@Injectable()
export class PeopleRepository {
    private http: Http;
    private user: User;

    constructor(http: Http) {
        this.http = http;
    }

    loadData(): Promise<IUser> {
        return new Promise(resolve => {
            this.http.get('data/data.json')
                .subscribe(res => {
                    let data = res.json();
                    this.user = new User(data);
                    resolve(this.user);
                })
        })
    }

    filterList(query: string, filter: Filters): Array<IUser> {
        let friends = this.user.friends;
        let isFavorite = (friend) => friend.favorite;

        return filter === Filters.Friends ?
            R.filter(isFavorite, friends) :
            friends;
    }
}
