import { ElementRef } from 'angular2/core';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { Navbar } from '../navbar/navbar';
/**
 * @private
 */
export declare class ToolbarBase extends Ion {
    itemRefs: any[];
    titleRef: any;
    titleCmp: any;
    constructor(elementRef: ElementRef, config: Config);
    /**
     * @private
     */
    setTitleCmp(titleCmp: any): void;
    /**
     * @private
     * Returns the toolbar title text if it exists or an empty string
     */
    getTitleText(): any;
    /**
     * @private
     */
    getTitleRef(): any;
    /**
     * @private
     * A toolbar items include the left and right side `ion-buttons`,
     * and every `menu-toggle`. It does not include the `ion-title`.
     * @returns {TODO} Array of this toolbar's item ElementRefs.
     */
    getItemRefs(): any[];
    /**
     * @private
     */
    addItemRef(itemElementRef: any): void;
}
/**
 * @name Toolbar
 * @description
 * The toolbar is generic bar that sits above or below content.
 * Unlike an `Navbar`, `Toolbar` can be used for a subheader as well.
 * @usage
 * ```html
 * <ion-toolbar>
 *   <ion-title>My Toolbar Title</ion-title>
 * </ion-toolbar>
 *
 *  <ion-content></ion-content>
 *  ```
 * @demo /docs/v2/demos/toolbar/
 * @see {@link ../../navbar/Navbar/ Navbar API Docs}
 */
export declare class Toolbar extends ToolbarBase {
    constructor(elementRef: ElementRef, config: Config);
}
/**
 * @name Title
 * @description
 * `ion-title` is a component that sets the title of the `Toolbar` or `Navbar`
 * @usage
 * ```html
 * <ion-navbar *navbar>
 *    <ion-title>Tab 1</ion-title>
 * </ion-navbar>
 *
 *<!-- or if you wanted to create a subheader title-->
 * <ion-navbar *navbar>
 *    <ion-title>Tab 1</ion-title>
 * </ion-navbar>
 * <ion-toolbar>
 *   <ion-title>SubHeader</ion-title>
 * </ion-toolbar>
 *  ```
 * @demo /docs/v2/demos/toolbar/
 */
export declare class ToolbarTitle extends Ion {
    constructor(elementRef: ElementRef, toolbar: Toolbar, navbar: Navbar);
    /**
     * @private
     */
    getTitleText(): any;
}
/**
 * @private
 */
export declare class ToolbarItem {
    inToolbar: boolean;
    constructor(elementRef: ElementRef, toolbar: Toolbar, navbar: Navbar);
    _buttons: any;
}
