import {Page} from 'ionic-framework/ionic';

const settingsPageView = require('./settingsPage.html');
const settingsPageStyles = require('./settingsPage.scss');

@Page({
    template: settingsPageView,
    styles: [settingsPageStyles]
})
export class SettingsPage {
    constructor() {

    }
}
