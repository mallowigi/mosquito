/**
 * Created by helio on 07/01/2016.
 */

import {App} from "ionic-framework/ionic";
import {Platform} from "ionic-framework/ionic";
import {TabsPage} from "./pages/tabs/tabsPage";
import {ElementRef} from "angular2/core";
import {Tabs} from "ionic-framework/ionic";
import {IonicApp} from "ionic-framework/ionic";
import {NavController} from "ionic-framework/ionic";
import {Config} from "ionic-framework/ionic";
import {Menu} from "ionic-framework/ionic";
import {ViewController} from "ionic-framework/ionic";
import {PeopleRepository} from "./providers/PeopleRepository";
import {IUser} from "./types/IUser";
import {User} from "./types/User";

var appView = require('./app.html');

@App({
    template: appView,
    providers: [PeopleRepository],
    config: {}
})
export class MyApp {
    private root;
    private app: IonicApp;
    private pages;

    public user: IUser;

    constructor(app: IonicApp, platform: Platform, config: Config, peopleRepo: PeopleRepository) {
        this.app = app;
        this.root = TabsPage;

        this.pages = [
            {title: 'List', component: TabsPage, icon: 'cube'},
        ];

        peopleRepo.loadData().then(user => {
            this.user = new User(user);
        });

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}
