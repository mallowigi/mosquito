var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var button_1 = require('../button/button');
var icon_1 = require('../icon/icon');
/**
 * @name Item
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * There are three common ways to use an item:
 * - Use `<ion-item>` for something that is only non-clickable text.
 * - Use `<button ion-item>` for something that can be clicked/tapped. Typically this element will also have a `(click)` handler.
 * - Use `<a ion-item>` for when the item needs to contain a `href`.
 *
 * By default, `<button ion-item>` and `<a ion-item>` will receive a right arrow icon on iOS to signal that tapping the item will reveal more information.
 * To hide this icon, add the `detail-none` attribute to the item (eg: `<button ion-item detail-none>`). To add the icon when it is not displayed by default,
 * add the `detail-push` attribute (eg: `<ion-item detail-push>`).
 *
 * To break an item up into multiple columns, add multiple `<ion-item-content>` components inside of the item. By default,
 * this component will automatically be added inside of an `<ion-item>`, giving it a single column.
 *
 *
 * @usage
 * ```html
 *
 * <ion-list>
 *
 *   // default item
 *   <ion-item>
 *     {{item.title}}
 *   </ion-item>
 *
 *   // multiple item-content containers
 *   <ion-item>
 *     <ion-item-content>First Column</ion-item-content>
 *     <ion-item-content>Second Column</ion-item-content>
 *     <ion-item-content>Third Column</ion-item-content>
 *   </ion-item>
 *
 * </ion-list>
 *
 *  ```
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
var Item = (function () {
    function Item() {
    }
    Object.defineProperty(Item.prototype, "_buttons", {
        set: function (buttons) {
            buttons.toArray().forEach(function (button) {
                if (!button.isItem) {
                    button.addClass('item-button');
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "_icons", {
        set: function (icons) {
            icons.toArray().forEach(function (icon) {
                icon.addClass('item-icon');
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChildren(button_1.Button), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Item.prototype, "_buttons", null);
    __decorate([
        core_1.ContentChildren(icon_1.Icon), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Item.prototype, "_icons", null);
    Item = __decorate([
        core_1.Component({
            selector: 'ion-item,[ion-item]',
            template: '<ng-content select="[item-left]"></ng-content>' +
                '<div class="item-inner">' +
                '<ng-content select="ion-item-content,[item-content]"></ng-content>' +
                '<ion-item-content cnt>' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '<ng-content select="[item-right]"></ng-content>' +
                '</div>',
            host: {
                'class': 'item'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], Item);
    return Item;
})();
exports.Item = Item;