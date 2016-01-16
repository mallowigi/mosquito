import {Page, Animation} from 'ionic-framework/ionic';
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
import {UserData} from "../../providers/UserData";

const homePageView = require('./homepage.html');
const homePageStyles = require('./homepage.scss');

@Page({
    template : homePageView,
    styles   : [homePageStyles],
    providers: [PeopleRepository, DocumentRepository]
})
export class HomePage {

    private nav: NavController;
    private documentRepo: DocumentRepository;
    private user: UserData;

    public filter: Filters;
    public queryText: string;
    public documents: Array<IDocument>;
    public filteredDocuments: IDocument[];

    constructor(nav: NavController, documentRepo: DocumentRepository, userData: UserData) {
        this.nav = nav;
        this.user = userData;

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

    likeUnlike(user: IUser, element, event) {
        event.stopPropagation();

        // todo do not work
        const like = new Animation(element);
        const isFriend = this.user.isFriend(user);

        if (!isFriend) {
            like.before.addClass('like-before');
            like.after.removeClass('like-before');
        } else {
            like.before.addClass('unlike-before');
            like.after.removeClass('unlike-before');
        }

        const anim = new Animation();
        anim.duration(1000);
        anim.add(like);
        anim.play();

        // Friend/unfriend this user
        this.user.friend(user)
    }

}
