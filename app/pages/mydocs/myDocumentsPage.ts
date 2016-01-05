import {Page} from 'ionic-framework/ionic';

const myDocumentsPageView = require('./myDocumentsPage.html');
const myDocumentsPageStyles = require('./myDocumentsPage.scss');

@Page({
    template: myDocumentsPageView,
    styles: [myDocumentsPageStyles]
})
export class MyDocumentsPage {
    constructor() {

    }
}
