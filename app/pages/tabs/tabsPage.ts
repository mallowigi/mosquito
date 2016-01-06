import {App, Platform} from 'ionic-framework/ionic';
import {HomePage} from '../homepage/homepage';
import {MyDocumentsPage} from "../mydocs/myDocumentsPage";
import {SettingsPage} from "../settings/settingsPage";
import {Page} from "ionic-framework/ionic";

const appView = require('./tabsPage.html');
const appStyles = require('./tabsPage.scss');

@Page({
    template: appView,
    styles: [appStyles]
})
export class TabsPage {
    public tab1Root;
    public tab2Root;
    public tab3Root;

    constructor() {

        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tab2Root = MyDocumentsPage;
        this.tab3Root = SettingsPage;

    }
}
