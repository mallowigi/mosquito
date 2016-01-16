import {Page} from "ionic-framework/ionic";

var cameraPageView = require('./cameraPage.html');

@Page({
    template: cameraPageView
})
export class CameraPage {
    constructor(){

    }

    getPicture() {
        window.Camera.getPicture()
    }
}
