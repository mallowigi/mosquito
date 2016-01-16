import {Page, NavController, NavParams} from "ionic-framework/ionic";
import {IDocument} from "../../types/IDocument";
import {IComment} from "../../types/IComment";

import * as R from "ramda";


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
    public commentsMax:number;
    public shownComments:IComment[];

    constructor(nav:NavController, navParams:NavParams) {
        this.nav = nav;
        this.navParams = navParams;
        this.document = this.navParams.data;

        // Max comments shown
        this.commentsMax = 5;
        // Shown comments
        this.shownComments = this.getSlice();
    }

    loadMoreComments():void {
        this.commentsMax += 5;
        this.shownComments = this.getSlice();
    }

    getSlice():IComment[] {
        return R.slice(0, this.commentsMax, <IComment[]> R.prop('comments', this.document));
    }

    onScroll(event) {
        console.log('foo');
    }
}
