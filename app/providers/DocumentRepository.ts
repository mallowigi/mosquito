/**
 * Created by helio on 13/01/2016.
 */

import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {IDocument} from "../types/IDocument";
import {Filters} from "./Filters";
import {UserData} from "./UserData";

import * as _ from "lodash";

@Injectable()
export class DocumentRepository {
    private http: Http;
    private userData: UserData;

    constructor(http: Http, userData: UserData) {
        this.http = http;
        this.userData = userData;
    }

    getLatest(): Promise<IDocument[]> {
        return new Promise(resolve => {
            //this.http.get('data/dashboard.json')
            //    .subscribe(res => {
            //        resolve(res.json().data);
            //    })
            resolve(this.generate());
        });
    }

    filterList(documents: IDocument[], queryText: string, filter: Filters): IDocument[] {
        switch (filter) {
            case Filters.Friends:
                return _.filter(documents, (doc) => {
                    return _.contains(this.userData.friends, doc.author)
                });
            case Filters.All:
                return documents;
        }

    }

    generate() {
        var faker = require('faker');
        return _.times(10, () => {
            return {
                title: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                id: faker.random.number(),
                author: {
                    name: faker.internet.userName(),
                    avatar: faker.image.avatar()
                },
                created: faker.date.recent(),
                updated: faker.date.recent(),
                imageUrl: faker.image.imageUrl(),
                likes: faker.random.number(),
                comments: []
            }
        })
    }
}
