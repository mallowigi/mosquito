/**
 * Created by helio on 07/01/2016.
 */

import {App} from "ionic-framework/ionic";
import {Platform} from "ionic-framework/ionic";
import {TabsPage} from "./pages/tabs/tabsPage";

@App({
    template: `<ion-nav [root]="root"></ion-nav>`
})
export class MyApp {
    private root;

    constructor(platform:Platform) {

        this.root = TabsPage;

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}
