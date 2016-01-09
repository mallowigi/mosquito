import {Page} from 'ionic-framework/ionic';
import {Platform} from "ionic-framework/ionic";
import {NavController} from "ionic-framework/ionic";
import {ActionSheet} from "ionic-framework/ionic";
import {Tabs} from "ionic-framework/ionic";
import {ElementRef} from "angular2/core";
import {PeopleRepository} from "../../providers/PeopleRepository";
import {User} from "../../providers/User";
import {Filters} from "../../providers/Filters";

const homePageView = require('./homepage.html');
const homePageStyles = require('./homepage.scss');

@Page({
    template: homePageView,
    styles: [homePageStyles],
    providers: [PeopleRepository, User]
})
export class HomePage {
    private platform: Platform;
    private nav: NavController;
    private peopleRepo: PeopleRepository;

    public filter: Filters;
    public queryText: string;
    public users: Array<User>;

    constructor(platform: Platform, nav: NavController, peopleRepo: PeopleRepository) {
        this.platform = platform;
        this.nav = nav;

        this.queryText = '';
        this.filter = Filters.All;
        this.users = [];

        this.peopleRepo = peopleRepo;
        peopleRepo.loadData().then(data => {
            this.users = data.friends;
        })
    }


    filterList() {
        this.users = this.peopleRepo.filterList(this.queryText, this.filter);
    }

}
