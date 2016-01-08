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
import {TutorialPage} from "./pages/tutorial/tutorial";
import {Menu} from "ionic-framework/ionic";
import {ViewController} from "ionic-framework/ionic";

var appView = require('./app.html');

@App({
    template: appView,
    config: {}
})
export class MyApp {
    private root;
    private app : IonicApp;
    private pages;
    private menu : Menu;

    constructor(app: IonicApp, platform:Platform, config: Config) {
        this.app = app;
        this.root = TabsPage;

        this.pages = [
            { title: 'List', component: TabsPage, icon: 'cube' },
        ];

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }


    openPage(page) {
        // find the nav component and set what the root page should be
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component).then(() => {
            // wait for the root page to be completely loaded
            // then close the menu
            this.menu.close()
        });
    }
}
