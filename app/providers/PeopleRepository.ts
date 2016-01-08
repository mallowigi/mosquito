import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {User} from "./User";
import * as _ from "lodash";

@Injectable()
export class PeopleRepository {
    private http:Http;
    private user:User;
    private data;

    constructor(http:Http, user:User) {
        this.http = http;
        this.user = user;
    }

    loadData() {
        return new Promise((resolve, reject) => {
            this.http.get('data/data.json')
                .subscribe(res => {
                    this.data = res.json();
                    resolve(this.data);
                })
        })
    }

    filterList(filter:string):Promise<Array<User>> {
        return new Promise(resolve => {
            resolve(filter === 'friends' ? _.filter(this.data, {friend: true}) : this.data);
        })
    }
}
