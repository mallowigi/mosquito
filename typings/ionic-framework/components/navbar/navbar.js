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
var ion_1 = require('../ion');
var icon_1 = require('../icon/icon');
var toolbar_1 = require('../toolbar/toolbar');
var config_1 = require('../../config/config');
var app_1 = require('../app/app');
var view_controller_1 = require('../nav/view-controller');
var nav_controller_1 = require('../nav/nav-controller');
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton(navCtrl, elementRef, navbar) {
        _super.call(this, elementRef, null);
        this.navCtrl = navCtrl;
        navbar && navbar.setBackButtonRef(elementRef);
    }
    BackButton.prototype.goBack = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.navCtrl && this.navCtrl.pop();
    };
    BackButton = __decorate([
        core_1.Directive({
            selector: '.back-button',
            host: {
                '(click)': 'goBack($event)'
            }
        }),
        __param(0, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, Navbar])
    ], BackButton);
    return BackButton;
    var _a, _b;
})(ion_1.Ion);
var BackButtonText = (function () {
    function BackButtonText(elementRef, navbar) {
        navbar.setBackButtonTextRef(elementRef);
    }
    BackButtonText = __decorate([
        core_1.Directive({
            selector: '.back-button-text'
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Navbar])
    ], BackButtonText);
    return BackButtonText;
    var _a;
})();
var ToolbarBackground = (function () {
    function ToolbarBackground(elementRef, navbar) {
        navbar.setBackgroundRef(elementRef);
    }
    ToolbarBackground = __decorate([
        core_1.Directive({
            selector: '.toolbar-background'
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Navbar])
    ], ToolbarBackground);
    return ToolbarBackground;
    var _a;
})();
/**
 * @name Navbar
 * @description
 * Navbar is a global level toolbar that gets updated every time a page gets
 * loaded. You can pass the navbar a `ion-title` or any number of buttons.
 *
 * @usage
 * ```html
 * <ion-navbar *navbar>
 *
 *   <ion-buttons>
 *     <button (click)="toggleItems()">
 *       toggle
 *     </button>
 *   </ion-buttons>
 *
 *   <ion-title>
 *     Page Title
 *   </ion-title>
 *
 *   <ion-buttons>
 *     <button (click)="openModal()">
 *       Modal
 *     </button>
 *   </ion-buttons>
 * </ion-navbar>
 * ```
 *
 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
 */
var Navbar = (function (_super) {
    __extends(Navbar, _super);
    function Navbar(app, viewCtrl, elementRef, config, renderer) {
        _super.call(this, elementRef, config);
        this.app = app;
        this.renderer = renderer;
        viewCtrl && viewCtrl.setNavbar(this);
        this.bbIcon = config.get('backButtonIcon');
        this.bbText = config.get('backButtonText');
    }
    /**
     * @private
     */
    Navbar.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var hideBackButton = this.hideBackButton;
        if (typeof hideBackButton === 'string') {
            this.hideBackButton = (hideBackButton === '' || hideBackButton === 'true');
        }
    };
    /**
     * @private
     */
    Navbar.prototype.getBackButtonRef = function () {
        return this.bbRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackButtonRef = function (backButtonElementRef) {
        this.bbRef = backButtonElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackButtonTextRef = function () {
        return this.bbtRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackButtonTextRef = function (backButtonTextElementRef) {
        this.bbtRef = backButtonTextElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackgroundRef = function (backgrouneElementRef) {
        this.bgRef = backgrouneElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackgroundRef = function () {
        return this.bgRef;
    };
    /**
     * @private
     */
    Navbar.prototype.didEnter = function () {
        try {
            this.app.setTitle(this.getTitleText());
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * @private
     */
    Navbar.prototype.setHidden = function (isHidden) {
        this._hidden = isHidden;
    };
    Navbar = __decorate([
        core_1.Component({
            selector: 'ion-navbar',
            template: '<div class="toolbar-background"></div>' +
                '<button class="back-button bar-button bar-button-default" [hidden]="hideBackButton">' +
                '<ion-icon class="back-button-icon" [name]="bbIcon"></ion-icon>' +
                '<span class="back-button-text">' +
                '<span class="back-default">{{bbText}}</span>' +
                '</span>' +
                '</button>' +
                '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
                '<ng-content select="ion-buttons[start]"></ng-content>' +
                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
                '<div class="toolbar-content">' +
                '<ng-content></ng-content>' +
                '</div>',
            host: {
                '[hidden]': '_hidden',
                'class': 'toolbar'
            },
            inputs: [
                'hideBackButton'
            ],
            directives: [BackButton, BackButtonText, icon_1.Icon, ToolbarBackground]
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _d) || Object, (typeof (_e = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _e) || Object])
    ], Navbar);
    return Navbar;
    var _a, _b, _c, _d, _e;
})(toolbar_1.ToolbarBase);
exports.Navbar = Navbar;
/**
 * @private
 * Used to find and register headers in a view, and this directive's
 * content will be moved up to the common navbar location, and created
 * using the same context as the view's content area.
*/
var NavbarTemplate = (function () {
    function NavbarTemplate(viewContainerRef, templateRef, viewCtrl) {
        if (viewCtrl) {
            viewCtrl.setNavbarTemplateRef(templateRef);
            viewCtrl.setNavbarViewRef(viewContainerRef);
        }
    }
    NavbarTemplate = __decorate([
        core_1.Directive({
            selector: 'template[navbar]'
        }),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.TemplateRef !== 'undefined' && core_1.TemplateRef) === 'function' && _b) || Object, (typeof (_c = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _c) || Object])
    ], NavbarTemplate);
    return NavbarTemplate;
    var _a, _b, _c;
})();
exports.NavbarTemplate = NavbarTemplate;