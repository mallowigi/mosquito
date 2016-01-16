import {Page, NavController, NavParams} from "ionic-framework/ionic";
import {IDocument} from "../../types/IDocument";

let documentPageView = require('./documentPage.html');
let documentPageStyle = require('./documentPage.scss');

@Page({
    template: documentPageView,
    styles: [documentPageStyle]
})
export class DocumentPage {
    private nav;
    private navParams;
    public document:IDocument;

    constructor(nav:NavController, navParams:NavParams) {
        this.nav = nav;
        this.navParams = navParams;

        this.document = this.navParams.data;
    }
}
