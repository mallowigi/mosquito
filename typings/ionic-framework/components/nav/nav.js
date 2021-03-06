var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var keyboard_1 = require('../../util/keyboard');
var config_component_1 = require('../../decorators/config-component');
var nav_controller_1 = require('./nav-controller');
var view_controller_1 = require('./view-controller');
/**
 * @name Nav
 * @description
 * _For a quick walkthrough of navigation in Ionic, check out the
 * [Navigation section](../../../../components/#navigation) of the Component
 * docs._
 *
 * Nav is a basic navigation controller component.  As a subclass of NavController
 * you use it to navigate to pages in your app and manipulate the navigation stack.
 * Nav automatically animates transitions between pages for you.
 *
 * For more information on using navigation controllers like Nav or [Tab](../../Tabs/Tab/),
 * take a look at the [NavController API reference](../NavController/).
 *
 * You must set a root page (where page is any [@Page](../../config/Page/)
 * component) to be loaded initially by any Nav you create, using
 * the 'root' property:
 *
 * ```ts
 * import {GettingStartedPage} from 'getting-started';
 * @App({
 *   template: `<ion-nav [root]="rootPage"></ion-nav>`
 * })
 * class MyApp {
 *   constructor(){
 *     this.rootPage = GettingStartedPage;
 *   }
 * }
 * ```
 *
 * <h2 id="back_navigation">Back navigation</h2>
 * If a [page](../NavController/#creating_pages) you navigate to has a [NavBar](../NavBar/),
 * Nav will automatically add a back button to it if there is a page
 * before the one you are navigating to in the navigation stack.
 *
 * Additionally, specifying the `swipe-back-enabled` property will allow you to
 * swipe to go back:
 * ```html
 * <ion-nav swipe-back-enabled="false" [root]="rootPage"></ion-nav>
 * ```
 *
 * Here is a diagram of how Nav animates smoothly between pages:
 *
 * <div class="highlight less-margin">
 *   <pre>
 *                           +-------+
 *                           |  App  |
 *                           +---+---+
 *                           &lt;ion-app&gt;
 *                               |
 *                  +------------+-------------+
 *                  |   Ionic Nav Controller   |
 *                  +------------+-------------+
 *                           &lt;ion-nav&gt;
 *                               |
 *                               |
 *             Page 3  +--------------------+                     LoginPage
 *           Page 2  +--------------------+ |
 *         Page 1  +--------------------+ | |              +--------------------+
 *                 | | Header           |&lt;-----------------|       Login        |
 *                 +--------------------+ | |              +--------------------+
 *                 | | |                | | |              | Username:          |
 *                 | | |                | | |              | Password:          |
 *                 | | |  Page 3 is     | | |              |                    |
 *                 | | |  only content  | | |              |                    |
 *                 | | |                |&lt;-----------------|                    |
 *                 | | |                | | |              |                    |
 *                 | | |                | | |              |                    |
 *                 | +------------------|-+ |              |                    |
 *                 | | Footer           |-|-+              |                    |
 *                 | +------------------|-+                |                    |
 *                 +--------------------+                  +--------------------+
 *
 *           +--------------------+    +--------------------+    +--------------------+
 *           | Header             |    | Content            |    | Content            |
 *           +--------------------+    |                    |    |                    |
 *           | Content            |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    +--------------------+    |                    |
 *           |                    |    | Footer             |    |                    |
 *           +--------------------+    +--------------------+    +--------------------+
 *
 *   </pre>
 * </div>
 *
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 */
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav(hostNavCtrl, viewCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
        _super.call(this, hostNavCtrl, app, config, keyboard, elementRef, 'contents', compiler, viewManager, zone, renderer, cd);
        if (viewCtrl) {
            // an ion-nav can also act as an ion-page within a parent ion-nav
            // this would happen when an ion-nav nests a child ion-nav.
            viewCtrl.setContent(this);
            viewCtrl.setContentRef(elementRef);
        }
    }
    /**
     * @private
     */
    Nav.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.root) {
            if (typeof this.root !== 'function') {
                throw 'The [root] property in <ion-nav> must be given a reference to a component class from within the constructor.';
            }
            this.push(this.root);
        }
        // default the swipe back to be enabled
        this.isSwipeBackEnabled((this.swipeBackEnabled || '').toString() !== 'false');
    };
    Nav = __decorate([
        config_component_1.ConfigComponent({
            selector: 'ion-nav',
            inputs: [
                'root'
            ],
            // defaultInputs: {
            //   'swipeBackEnabled': true
            // },
            template: '<template #contents></template>'
        }),
        __param(0, core_1.Optional()),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object, (typeof (_b = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _b) || Object, (typeof (_c = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _c) || Object, (typeof (_d = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _d) || Object, (typeof (_e = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _e) || Object, (typeof (_f = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _f) || Object, (typeof (_g = typeof core_1.Compiler !== 'undefined' && core_1.Compiler) === 'function' && _g) || Object, (typeof (_h = typeof core_1.AppViewManager !== 'undefined' && core_1.AppViewManager) === 'function' && _h) || Object, (typeof (_j = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _j) || Object, (typeof (_k = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _k) || Object, (typeof (_l = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _l) || Object])
    ], Nav);
    return Nav;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
})(nav_controller_1.NavController);
exports.Nav = Nav;