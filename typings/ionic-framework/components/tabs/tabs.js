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
var core_2 = require('angular2/core');
var common_1 = require('angular2/common');
var ion_1 = require('../ion');
var id_1 = require('../app/id');
var config_1 = require('../../config/config');
var platform_1 = require('../../platform/platform');
var nav_controller_1 = require('../nav/nav-controller');
var view_controller_1 = require('../nav/view-controller');
var config_component_1 = require('../../decorators/config-component');
var icon_1 = require('../icon/icon');
var dom_1 = require('../../util/dom');
/**
 * @name Tabs
 * @property {any} [tabbarPlacement] - set position of the tabbar, top or bottom
 * @property {any} [tabbarIcons] - set the position of the tabbar's icons: top, bottom, left, right, hide
 * @property {any} [preloadTabs] - sets whether to preload all the tabs, true or false
 * @usage
* ```html
 * <ion-tabs>
 *   <ion-tab [root]="tabRoot"></ion-tab>
 * </ion-tabs>
 * ```
 * @description
 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
 * of the Component docs._
 *
 * The Tabs component is a container with a TabBar and any number of
 * individual Tab components. On iOS, the TabBar is placed on the bottom of
 * the screen, while on Android it is at the top.
 *
 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
 * @see {@link ../Tab Tab API Docs}
 */
var Tabs = (function (_super) {
    __extends(Tabs, _super);
    /**
     * Hi, I'm "Tabs". I'm really just another Page, with a few special features.
     * "Tabs" can be a sibling to other pages that can be navigated to, which those
     * sibling pages may or may not have their own tab bars (doesn't matter). The fact
     * that "Tabs" can happen to have children "Tab" classes, and each "Tab" can have
     * children pages with their own "ViewController" instance, as nothing to do with the
     * point that "Tabs" is itself is just a page with its own instance of ViewController.
     */
    function Tabs(config, elementRef, viewCtrl, navCtrl, _platform) {
        var _this = this;
        _super.call(this, elementRef, config);
        this._platform = _platform;
        this.change = new core_2.EventEmitter();
        this.parent = navCtrl;
        this.subPages = config.get('tabSubPages');
        this._tabs = [];
        this._id = ++tabIds;
        this._ids = -1;
        this._onReady = null;
        // Tabs may also be an actual ViewController which was navigated to
        // if Tabs is static and not navigated to within a NavController
        // then skip this and don't treat it as it's own ViewController
        if (viewCtrl) {
            viewCtrl.setContent(this);
            viewCtrl.setContentRef(elementRef);
            viewCtrl.onReady = function (done) {
                _this._onReady = done;
            };
        }
    }
    /**
     * @private
     */
    Tabs.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.preloadTabs = (this.preloadTabs !== "false" && this.preloadTabs !== false);
        if (this._highlight) {
            this._platform.onResize(function () {
                _this._highlight.select(_this.getSelected());
            });
        }
    };
    /**
     * @private
     */
    Tabs.prototype.add = function (tab) {
        tab.id = this._id + '-' + (++this._ids);
        this._tabs.push(tab);
        return (this._tabs.length === 1);
    };
    /**
     * @param {Number} index Index of the tab you want to select
     */
    Tabs.prototype.select = function (tabOrIndex) {
        var _this = this;
        var selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex);
        if (!selectedTab) {
            return Promise.reject();
        }
        var deselectedTab = this.getSelected();
        if (selectedTab === deselectedTab) {
            // no change
            return this._touchActive(selectedTab);
        }
        console.time('Tabs#select ' + selectedTab.id);
        var opts = {
            animate: false
        };
        var deselectedPage;
        if (deselectedTab) {
            deselectedPage = deselectedTab.getActive();
            deselectedPage && deselectedPage.willLeave();
        }
        var selectedPage = selectedTab.getActive();
        selectedPage && selectedPage.willEnter();
        selectedTab.load(opts, function () {
            selectedTab.emitSelect();
            _this.change.emit(selectedTab);
            if (selectedTab.root) {
                // only show the selectedTab if it has a root
                // it's possible the tab is only for opening modal's or signing out
                // and doesn't actually have content. In the case there's no content
                // for a tab then do nothing and leave the current view as is
                _this._tabs.forEach(function (tab) {
                    tab.setSelected(tab === selectedTab);
                });
            }
            _this._highlight && _this._highlight.select(selectedTab);
            selectedPage && selectedPage.didEnter();
            deselectedPage && deselectedPage.didLeave();
            if (_this._onReady) {
                _this._onReady();
                _this._onReady = null;
            }
            console.time('Tabs#select ' + selectedTab.id);
        });
    };
    /**
     * @param {Number} index Index of the tab you want to get
     * @returns {Any} Tab Returs the tab who's index matches the one passed
     */
    Tabs.prototype.getByIndex = function (index) {
        if (index < this._tabs.length && index > -1) {
            return this._tabs[index];
        }
        return null;
    };
    /**
     * @return {Any} Tab Returns the currently selected tab
     */
    Tabs.prototype.getSelected = function () {
        for (var i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].isSelected) {
                return this._tabs[i];
            }
        }
        return null;
    };
    /**
     * @private
     */
    Tabs.prototype.getIndex = function (tab) {
        return this._tabs.indexOf(tab);
    };
    /**
     * @private
     * "Touch" the active tab, going back to the root view of the tab
     * or optionally letting the tab handle the event
     */
    Tabs.prototype._touchActive = function (tab) {
        var active = tab.getActive();
        if (!active) {
            return Promise.resolve();
        }
        var instance = active.instance;
        // If they have a custom tab selected handler, call it
        if (instance.tabSelected) {
            return instance.tabSelected();
        }
        // If we're a few pages deep, pop to root
        if (tab.length() > 1) {
            // Pop to the root view
            return tab.popToRoot();
        }
        // Otherwise, if the page we're on is not our real root, reset it to our
        // default root type
        if (tab.root != active.componentType) {
            return tab.setRoot(tab.root);
        }
        // And failing all of that, we do something safe and secure
        return Promise.resolve();
    };
    Object.defineProperty(Tabs.prototype, "rootNav", {
        /**
         * Returns the root NavController. Returns `null` if Tabs is not
         * within a NavController.
         * @returns {NavController}
         */
        get: function () {
            var nav = this.parent;
            while (nav.parent) {
                nav = nav.parent;
            }
            return nav;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_2.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_2.EventEmitter !== 'undefined' && core_2.EventEmitter) === 'function' && _a) || Object)
    ], Tabs.prototype, "change", void 0);
    Tabs = __decorate([
        config_component_1.ConfigComponent({
            selector: 'ion-tabs',
            defaultInputs: {
                'tabbarPlacement': 'bottom',
                'tabbarIcons': 'top',
                'preloadTabs': false
            },
            template: '<ion-navbar-section>' +
                '<template navbar-anchor></template>' +
                '</ion-navbar-section>' +
                '<ion-tabbar-section>' +
                '<tabbar role="tablist">' +
                '<a *ngFor="#t of _tabs" [tab]="t" class="tab-button" role="tab">' +
                '<ion-icon [name]="t.tabIcon" [isActive]="t.isSelected" class="tab-button-icon"></ion-icon>' +
                '<span class="tab-button-text">{{t.tabTitle}}</span>' +
                '</a>' +
                '<tab-highlight></tab-highlight>' +
                '</tabbar>' +
                '</ion-tabbar-section>' +
                '<ion-content-section>' +
                '<ng-content></ng-content>' +
                '</ion-content-section>',
            directives: [
                icon_1.Icon,
                common_1.NgFor,
                common_1.NgIf,
                id_1.Attr,
                core_1.forwardRef(function () { return TabButton; }),
                core_1.forwardRef(function () { return TabHighlight; }),
                core_1.forwardRef(function () { return TabNavBarAnchor; })
            ]
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _d) || Object, (typeof (_e = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _e) || Object, (typeof (_f = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _f) || Object])
    ], Tabs);
    return Tabs;
    var _a, _b, _c, _d, _e, _f;
})(ion_1.Ion);
exports.Tabs = Tabs;
var tabIds = -1;
/**
 * @private
 */
var TabButton = (function (_super) {
    __extends(TabButton, _super);
    function TabButton(tabs, config, elementRef) {
        _super.call(this, elementRef, config);
        this.tabs = tabs;
        this.disHover = (config.get('hoverCSS') === false);
    }
    TabButton.prototype.ngOnInit = function () {
        this.tab.btn = this;
        this.hasTitle = !!this.tab.tabTitle;
        this.hasIcon = !!this.tab.tabIcon;
        this.hasTitleOnly = (this.hasTitle && !this.hasIcon);
        this.hasIconOnly = (this.hasIcon && !this.hasTitle);
    };
    TabButton.prototype.onClick = function () {
        this.tabs.select(this.tab);
    };
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TabButton.prototype, "onClick", null);
    TabButton = __decorate([
        core_1.Directive({
            selector: '.tab-button',
            inputs: ['tab'],
            host: {
                '[attr.id]': 'tab._btnId',
                '[attr.aria-controls]': 'tab._panelId',
                '[attr.aria-selected]': 'tab.isSelected',
                '[class.has-title]': 'hasTitle',
                '[class.has-icon]': 'hasIcon',
                '[class.has-title-only]': 'hasTitleOnly',
                '[class.icon-only]': 'hasIconOnly',
                '[class.disable-hover]': 'disHover'
            }
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Tabs, (typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
    ], TabButton);
    return TabButton;
    var _a, _b;
})(ion_1.Ion);
/**
 * @private
 */
var TabHighlight = (function () {
    function TabHighlight(tabs, config, elementRef) {
        if (config.get('tabbarHighlight')) {
            tabs._highlight = this;
            this.elementRef = elementRef;
        }
    }
    TabHighlight.prototype.select = function (tab) {
        var _this = this;
        dom_1.rafFrames(3, function () {
            var d = tab.btn.getDimensions();
            var ele = _this.elementRef.nativeElement;
            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
            if (!_this.init) {
                _this.init = true;
                dom_1.rafFrames(6, function () {
                    ele.classList.add('animate');
                });
            }
        });
    };
    TabHighlight = __decorate([
        core_1.Directive({
            selector: 'tab-highlight'
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Tabs, (typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
    ], TabHighlight);
    return TabHighlight;
    var _a, _b;
})();
/**
 * @private
 */
var TabNavBarAnchor = (function () {
    function TabNavBarAnchor(tabs, viewContainerRef) {
        tabs.navbarContainerRef = viewContainerRef;
    }
    TabNavBarAnchor = __decorate([
        core_1.Directive({ selector: 'template[navbar-anchor]' }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Tabs, (typeof (_a = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _a) || Object])
    ], TabNavBarAnchor);
    return TabNavBarAnchor;
    var _a;
})();