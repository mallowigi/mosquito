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
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var platform_1 = require('../../platform/platform');
var keyboard_1 = require('../../util/keyboard');
var gestures = require('./menu-gestures');
/**
 * @name Menu
 * @description
 * _For basic Menu usage, see the [Menu section](../../../../components/#menus)
 * of the Component docs._
 *
 * Menu is a side-menu navigation that can be dragged out or toggled to show.
 *
 * @usage
 * In order to use Menu, you must specify a [reference](https://angular.io/docs/ts/latest/guide/user-input.html#local-variables)
 * to the content element that Menu should listen on for drag events, using the `content` property:
 *
 * ```html
 * <ion-menu [content]="mycontent">
 *   <ion-content>
 *     <ion-list>
 *     ...
 *     </ion-list>
 *   </ion-content>
 * </ion-menu>
 *
 * <ion-nav #mycontent [root]="rootPage"></ion-nav>
 * ```
 *
 * By default, Menus are on the left, but this can be overriden with the `side`
 * property:
 * ```html
 * <ion-menu [content]="mycontent" side="right"></ion-menu>
 * ```
 *
 * Menus can optionally be given an `id` attribute which allows the app to
 * to get ahold of menu references. If no `id` is given then the menu
 * automatically receives an `id` created from the side it is on, such as
 * `leftMenu` or `rightMenu`. When using more than one menu it is always
 * recommended to give each menu a unique `id`. Additionally menuToggle and
 * menuClose directives should be given menu id values of their respective
 * menu.
 *
 * Menu supports two display styles: overlay, and reveal. Overlay
 * is the traditional Android drawer style, and Reveal is the traditional iOS
 * style. By default, Menu will adjust to the correct style for the platform,
 * but this can be overriden using the `type` property:
 * ```html
 * <ion-menu [content]="mycontent" type="overlay"></ion-menu>
 * ```
 *
 * To programatically interact with the menu, you first get the menu component.
 *
 * ```ts
 * @Page({
 * `<ion-menu [content]="mycontent" id="leftMenu"></ion-menu>
 * <ion-nav #mycontent [root]="rootPage"></ion-nav>`
 * )}
 * export class MyClass{
 *  constructor(app: IonicApp){
 *    this.app = app;
 *    this.menu;
 *  }
 *
 *  // Wait until the page is ready
 *  ngAfterViewInit(){
 *    this.menu = this.app.getComponent('leftMenu');
 *  }
 *
 *  // Open the menu programatically
 *  openMenu(){
 *    this.menu.open();
 *  }
 *
 * }
 * ```
 *
 * If you want to use any of the APIs down below, make sure to grabe the menu component by it's ID
 *
 * @demo /docs/v2/demos/menu/
 *
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../../nav/Nav Nav API Docs}
 *
 */
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(elementRef, config, app, platform, keyboard, zone) {
        _super.call(this, elementRef, config);
        this.app = app;
        this.platform = platform;
        this.keyboard = keyboard;
        this.zone = zone;
        this.opening = new core_1.EventEmitter('opening');
        this.isOpen = false;
        this._preventTime = 0;
        this.isEnabled = true;
    }
    /**
     * @private
     */
    Menu.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var self = this;
        var content = self.content;
        self._cntEle = (content instanceof Node) ? content : content && content.getNativeElement && content.getNativeElement();
        if (!self._cntEle) {
            return console.error('Menu: must have a [content] element to listen for drag events on. Example:\n\n<ion-menu [content]="content"></ion-menu>\n\n<ion-nav #content></ion-nav>');
        }
        if (self.side !== 'left' && self.side !== 'right') {
            self.side = 'left';
        }
        if (!self.id) {
            // Auto register
            self.id = self.side + 'Menu';
            if (self.app.getComponent(self.id)) {
                // id already exists, make sure this one is unique
                self.id += (++menuIds);
            }
            self.app.register(self.id, self);
        }
        self._initGesture();
        self._initType(self.type);
        self._cntEle.classList.add('menu-content');
        self._cntEle.classList.add('menu-content-' + self.type);
        self.onContentClick = function (ev) {
            if (self.isEnabled) {
                ev.preventDefault();
                ev.stopPropagation();
                self.close();
            }
        };
    };
    /**
     * @private
     */
    Menu.prototype._initGesture = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            switch (_this.side) {
                case 'right':
                    _this._gesture = new gestures.RightMenuGesture(_this);
                    break;
                case 'left':
                    _this._gesture = new gestures.LeftMenuGesture(_this);
                    break;
            }
            _this._targetGesture = new gestures.TargetGesture(_this);
        });
    };
    /**
     * @private
     */
    Menu.prototype._initType = function (type) {
        type = type && type.trim().toLowerCase();
        if (!type) {
            type = this.config.get('menuType');
        }
        this.type = type;
    };
    /**
     * @private
     */
    Menu.prototype._getType = function () {
        if (!this._type) {
            this._type = new menuTypes[this.type](this);
            if (this.config.get('animate') === false) {
                this._type.open.duration(33);
                this._type.close.duration(33);
            }
        }
        return this._type;
    };
    /**
     * Sets the state of the Menu to open or not.
     * @param {boolean} isOpen  If the Menu is open or not.
     * @return {Promise} returns a promise once set
     */
    Menu.prototype.setOpen = function (shouldOpen) {
        var _this = this;
        // _isPrevented is used to prevent unwanted opening/closing after swiping open/close
        // or swiping open the menu while pressing down on the menuToggle button
        if (shouldOpen === this.isOpen || this._isPrevented()) {
            return Promise.resolve();
        }
        this._before();
        return this._getType().setOpen(shouldOpen).then(function () {
            _this._after(shouldOpen);
        });
    };
    /**
     * @private
     */
    Menu.prototype.setProgressStart = function () {
        // user started swiping the menu open/close
        if (this._isPrevented() || !this.isEnabled)
            return;
        this._before();
        this._getType().setProgressStart(this.isOpen);
    };
    /**
     * @private
     */
    Menu.prototype.setProgess = function (value) {
        // user actively dragging the menu
        if (this.isEnabled) {
            this._prevent();
            this._getType().setProgess(value);
            this.opening.next(value);
        }
    };
    /**
     * @private
     */
    Menu.prototype.setProgressEnd = function (shouldComplete) {
        var _this = this;
        // user has finished dragging the menu
        if (this.isEnabled) {
            this._prevent();
            this._getType().setProgressEnd(shouldComplete).then(function (isOpen) {
                _this._after(isOpen);
            });
        }
    };
    /**
     * @private
     */
    Menu.prototype._before = function () {
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        if (this.isEnabled) {
            this.getNativeElement().classList.add('show-menu');
            this.getBackdropElement().classList.add('show-backdrop');
            this._prevent();
            this.keyboard.close();
        }
    };
    /**
     * @private
     */
    Menu.prototype._after = function (isOpen) {
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        if ((this.isEnabled && isOpen) || !isOpen) {
            this._prevent();
            this.isOpen = isOpen;
            this._cntEle.classList[isOpen ? 'add' : 'remove']('menu-content-open');
            this._cntEle.removeEventListener('click', this.onContentClick);
            if (isOpen) {
                this._cntEle.addEventListener('click', this.onContentClick);
            }
            else {
                this.getNativeElement().classList.remove('show-menu');
                this.getBackdropElement().classList.remove('show-backdrop');
            }
        }
    };
    /**
     * @private
     */
    Menu.prototype._prevent = function () {
        // used to prevent unwanted opening/closing after swiping open/close
        // or swiping open the menu while pressing down on the menuToggle
        this._preventTime = Date.now() + 20;
    };
    /**
     * @private
     */
    Menu.prototype._isPrevented = function () {
        return this._preventTime > Date.now();
    };
    /**
     * Progamatically open the Menu
     * @return {Promise} returns a promise when the menu is fully opened
     */
    Menu.prototype.open = function () {
        return this.setOpen(true);
    };
    /**
     * Progamatically close the Menu
     * @return {Promise} returns a promise when the menu is fully closed
     */
    Menu.prototype.close = function () {
        return this.setOpen(false);
    };
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it will close
     * @return {Promise} returns a promise when the menu has been toggled
     */
    Menu.prototype.toggle = function () {
        return this.setOpen(!this.isOpen);
    };
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be dragged open.
     * @param {boolean} shouldEnable  True if it should be enabled, false if not.
     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
     */
    Menu.prototype.enable = function (shouldEnable) {
        this.isEnabled = shouldEnable;
        if (!shouldEnable) {
            this.close();
        }
        return this;
    };
    /**
     * @private
     */
    Menu.prototype.getMenuElement = function () {
        return this.getNativeElement();
    };
    /**
     * @private
     */
    Menu.prototype.getContentElement = function () {
        return this._cntEle;
    };
    /**
     * @private
     */
    Menu.prototype.getBackdropElement = function () {
        return this.backdrop.elementRef.nativeElement;
    };
    /**
     * @private
     */
    Menu.register = function (name, cls) {
        menuTypes[name] = cls;
    };
    /**
     * @private
     */
    Menu.prototype.ngOnDestroy = function () {
        this.app.unregister(this.id);
        this._gesture && this._gesture.destroy();
        this._targetGesture && this._targetGesture.destroy();
        this._type && this._type.ngOnDestroy();
        this._cntEle = null;
    };
    Menu.getById = function (app, menuId) {
        var menu = null;
        if (menuId) {
            menu = app.getComponent(menuId);
            if (!menu) {
                console.error('Menu with id "' + menuId + '" cannot be found for menuToggle');
                return;
            }
        }
        else {
            menu = app.getComponent('leftMenu');
            if (!menu) {
                menu = app.getComponent('rightMenu');
            }
            if (!menu) {
                console.error('Menu with id "leftMenu" or "rightMenu" cannot be found for menuToggle');
                return;
            }
        }
        return menu;
    };
    Menu = __decorate([
        core_1.Component({
            selector: 'ion-menu',
            inputs: [
                'content',
                'id',
                'side',
                'type',
                'maxEdgeStart'
            ],
            defaultInputs: {
                'side': 'left',
                'menuType': 'reveal'
            },
            outputs: ['opening'],
            host: {
                'role': 'navigation',
                '[attr.side]': 'side',
                '[attr.type]': 'type'
            },
            template: '<ng-content></ng-content><div tappable disable-activated class="backdrop"></div>',
            directives: [core_1.forwardRef(function () { return MenuBackdrop; })]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _c) || Object, (typeof (_d = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _d) || Object, (typeof (_e = typeof keyboard_1.Keyboard !== 'undefined' && keyboard_1.Keyboard) === 'function' && _e) || Object, (typeof (_f = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _f) || Object])
    ], Menu);
    return Menu;
    var _a, _b, _c, _d, _e, _f;
})(ion_1.Ion);
exports.Menu = Menu;
var menuTypes = {};
var menuIds = 0;
var MenuBackdrop = (function () {
    function MenuBackdrop(menu, elementRef) {
        this.menu = menu;
        this.elementRef = elementRef;
        menu.backdrop = this;
    }
    /**
     * @private
     */
    MenuBackdrop.prototype.clicked = function (ev) {
        console.debug('backdrop clicked');
        ev.preventDefault();
        ev.stopPropagation();
        this.menu.close();
    };
    MenuBackdrop = __decorate([
        core_1.Directive({
            selector: '.backdrop',
            host: {
                '(click)': 'clicked($event)'
            }
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Menu, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], MenuBackdrop);
    return MenuBackdrop;
    var _a;
})();