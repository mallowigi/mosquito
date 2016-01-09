import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {User} from "./User";
import * as R from "ramda";
import {Filters} from "./Filters";

@Injectable()
export class PeopleRepository {
    private http: Http;
    private user: User;

    constructor(http: Http, user: User) {
        this.http = http;
        this.user = user;
    }

    loadData(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.http.get('data/data.json')
                .subscribe(res => {
                    let data = res.json();
                    this.user.parseData(data);
                    resolve(this.user);
                })
        })
    }

    filterList(query: string, filter: Filters): Array<User> {
        let friends: User[] = R.prop('friends', this.user);
        let isFavorite = (friend) => friend.favorite;

        return filter === Filters.Friends ?
            R.filter(isFavorite, friends) :
            friends;
    }
}
