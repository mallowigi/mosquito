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
var config_1 = require('../../config/config');
var virtual_1 = require('./virtual');
var item_sliding_gesture_1 = require('../item/item-sliding-gesture');
var util_1 = require('../../util');
/**
 * The List is a widely used interface element in almost any mobile app, and can include
 * content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves can be any HTML
 * element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and removing items.
 * @demo /docs/v2/demos/list/
 * @see {@link /docs/v2/components#lists List Component Docs}
 *
 *
 */
var List = (function (_super) {
    __extends(List, _super);
    function List(elementRef, config, zone) {
        _super.call(this, elementRef, config);
        this.zone = zone;
        this.ele = elementRef.nativeElement;
        this._enableSliding = false;
    }
    /**
     * @private
     */
    List.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (util_1.isDefined(this.virtual)) {
            console.log('Content', this.content);
            console.log('Virtual?', this.virtual);
            console.log('Items?', this.items.length, 'of \'em');
            this._initVirtualScrolling();
        }
    };
    /**
     * @private
     */
    List.prototype.ngOnDestroy = function () {
        this.ele = null;
        this.slidingGesture && this.slidingGesture.unlisten();
    };
    /**
     * @private
     */
    List.prototype._initVirtualScrolling = function () {
        if (!this.content) {
            return;
        }
        this._virtualScrollingManager = new virtual_1.ListVirtualScroll(this);
    };
    /**
     * @private
     */
    List.prototype.setItemTemplate = function (item) {
        this.itemTemplate = item;
    };
    /**
     * Enable sliding items if your page has them
     *
     * ```ts
     * export class MyClass {
     *    constructor(app: IonicApp){
     *      this.app = app;
     *      this.list = this.app.getComponent('my-list');
     *    }
     *    stopSliding(){
     *      this.list.enableSlidingItems(false);
     *    }
     * }
     * ```
     * @param {Boolean} shouldEnable whether the item-sliding should be enabled or not
     */
    List.prototype.enableSlidingItems = function (shouldEnable) {
        var _this = this;
        if (this._enableSliding !== shouldEnable) {
            this._enableSliding = shouldEnable;
            if (shouldEnable) {
                console.debug('enableSlidingItems');
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.slidingGesture = new item_sliding_gesture_1.ItemSlidingGesture(_this, _this.ele);
                    });
                });
            }
            else {
                this.slidingGesture && this.slidingGesture.unlisten();
            }
        }
    };
    /**
     * Enable sliding items if your page has
     *
     * ```ts
     * export class MyClass {
     *    constructor(app: IonicApp){
     *      this.app = app;
     *      this.list = this.app.getComponent('my-list');
     *    }
     *    // Here we have some method that will close the items
     *    // when called
     *    closeItmes(){
     *      this.list.closeSlidingItems();
     *    }
     * }
     * ```
     */
    List.prototype.closeSlidingItems = function () {
        this.slidingGesture && this.slidingGesture.closeOpened();
    };
    List = __decorate([
        core_1.Directive({
            selector: 'ion-list',
            inputs: [
                'items',
                'virtual',
                'content'
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
    ], List);
    return List;
    var _a, _b, _c;
})(ion_1.Ion);
exports.List = List;
/**
 * @private
 */
var ListHeader = (function () {
    function ListHeader(_renderer, _elementRef, id) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._id = id;
    }
    Object.defineProperty(ListHeader.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this._renderer.setElementAttribute(this._elementRef, 'id', val);
        },
        enumerable: true,
        configurable: true
    });
    ListHeader = __decorate([
        core_1.Directive({
            selector: 'ion-list-header'
        }),
        __param(2, core_1.Attribute('id')), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, String])
    ], ListHeader);
    return ListHeader;
    var _a, _b;
})();
exports.ListHeader = ListHeader;