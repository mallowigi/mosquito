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

    constructor(platform:Platform, nav:NavController) {
        this.platform = platform;
        this.nav = nav;
    }

    openMenu() {
        var actionSheet = ActionSheet.create({
            title: 'Modify your album',
            buttons: [
                {
                    text: 'Delete',
                    style: 'destructive',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Archive',
                    handler: () => {
                        console.log('Archive clicked');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
            ]
        });

        this.nav.present(actionSheet);
    }
}
