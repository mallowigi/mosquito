import {Page} from 'ionic-framework/ionic';
import {Platform} from "ionic-framework/ionic";
import {NavController} from "ionic-framework/ionic";
import {ActionSheet} from "ionic-framework/ionic";
import {Tabs} from "ionic-framework/ionic";
import {ElementRef} from "angular2/core";
import {PeopleRepository} from "../../providers/PeopleRepository";
import {Filters} from "../../providers/Filters";

import * as _ from "lodash";
import {IUser} from "../../types/IUser";
import {User} from "../../types/User";
import {IDocument} from "../../types/IDocument";
import {DocumentRepository} from "../../providers/DocumentRepository";
import {DocumentPage} from "../document/documentPage";

const homePageView = require('./homepage.html');
const homePageStyles = require('./homepage.scss');

@Page({
    template: homePageView,
    styles: [homePageStyles],
    providers: [PeopleRepository, DocumentRepository]
})
export class HomePage {
    private platform: Platform;
    private nav: NavController;
    private documentRepo: DocumentRepository;

    public filter: Filters;
    public queryText: string;
    public documents: Array<IDocument>;
    public filteredDocuments: IDocument[];

    constructor(platform: Platform, nav: NavController, documentRepo: DocumentRepository) {
        this.platform = platform;
        this.nav = nav;

        this.queryText = '';
        this.filter = Filters.All;
        this.documents = [];
        this.filteredDocuments = [];

        this.documentRepo = documentRepo;
        documentRepo.getLatest().then(docs => {
            this.documents = docs;
            this.filteredDocuments = docs;
        });
    }


    filterList() {
        this.filteredDocuments = this.documentRepo.filterList(this.documents, this.queryText, this.filter);
    }

    goToDetailPage(document: IDocument) {
        this.nav.push(DocumentPage, document);
    }

}
