import {Page} from 'ionic-framework/ionic';
import {Platform} from "ionic-framework/ionic";
import {NavController} from "ionic-framework/ionic";
import {ActionSheet} from "ionic-framework/ionic";

const homePageView = require('./homepage.html');
const homePageStyles = require('./homepage.scss');

@Page({
    template: homePageView,
    styles: [homePageStyles]
})
export class HomePage {
    private platform;
    private nav;
    private actionSheet;

    constructor(platform:Platform, nav:NavController, actionSheet:ActionSheet) {
        this.platform = platform;
        this.actionSheet = actionSheet;
        this.nav = nav;
    }

    openMenu() {
        this.actionSheet.open({
            buttons: [{
                text: 'Share',
            }],
            titleText: 'Hola!',
            cancelText: 'Dismiss',
            destructiveText: 'Delete',
            destructiveButtonClicked() {
                console.log('Destructive clicked');
            },
            buttonClicked(index) {
                console.log('Button clicked', index);
                if (index == 1) {
                    return false;
                }
                return true;
            }

        });
    }
}
