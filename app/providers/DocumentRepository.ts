/**
 * Created by helio on 13/01/2016.
 */

import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {IDocument} from "../types/IDocument";
import {Filters} from "./Filters";
import {UserData} from "./UserData";

import * as _ from "lodash";
import * as R from "ramda";
import {IComment} from "../types/IComment";
import {IUser} from "../types/IUser";

var faker = require('faker');


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
            resolve(DocumentRepository.generateDashboard());
        });
    }

    filterList(documents: IDocument[], queryText: string, filter: Filters): IDocument[] {
        let query = new RegExp(queryText, 'i');
        let fDocs = R.filter(R.or(
            R.where({
                title: R.test(query)
            }),
            R.where({
                description: R.test(query)
            })
        ))(documents);

        switch (filter) {
            case Filters.Friends:
                return _.filter(fDocs, (doc) => {
                    return _.contains(this.userData.friends, doc.author)
                });
            case Filters.All:
                return fDocs;
        }

    }

    private static generateDashboard() {
        return _.times(10, () => {
            return {
                title      : faker.commerce.productName(),
                description: faker.lorem.sentence(),
                id         : faker.random.number(),
                author     : DocumentRepository.generateAuthor(),
                created    : faker.date.recent(),
                updated    : faker.date.recent(),
                imageUrl   : faker.image.imageUrl(),
                likes      : faker.random.number({max: 100}),
                comments   : DocumentRepository.generateComments()
            }
        })
    }

    private generateDocuments() {
        return _.times(10, () => {
            return {
                title      : faker.commerce.productName(),
                description: faker.lorem.sentence(),
                id         : faker.random.number(),
                author     : this.userData,
                created    : faker.date.recent(),
                updated    : faker.date.recent(),
                imageUrl   : faker.image.imageUrl(),
                likes      : faker.random.number({max: 100}),
                comments   : DocumentRepository.generateComments()
            }
        })
    }

    private static generateComments(): IComment[] {
        return _.times(faker.random.number({max: 30}), () => {
            return {
                message: faker.company.catchPhrase(),
                author : DocumentRepository.generateAuthor(),
                created: faker.date.recent()
            };
        });
    }

    private static generateAuthor(): IUser {
        return {
            name  : faker.internet.userName(),
            id    : faker.random.number(),
            avatar: faker.image.avatar()
        };
    }

}
