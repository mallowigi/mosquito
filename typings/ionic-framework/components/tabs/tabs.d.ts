import { ElementRef } from 'angular2/core';
import { EventEmitter } from 'angular2/core';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { Platform } from '../../platform/platform';
import { NavController } from '../nav/nav-controller';
import { ViewController } from '../nav/view-controller';
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
export declare class Tabs extends Ion {
    private _platform;
    change: EventEmitter<any>;
    /**
     * Hi, I'm "Tabs". I'm really just another Page, with a few special features.
     * "Tabs" can be a sibling to other pages that can be navigated to, which those
     * sibling pages may or may not have their own tab bars (doesn't matter). The fact
     * that "Tabs" can happen to have children "Tab" classes, and each "Tab" can have
     * children pages with their own "ViewController" instance, as nothing to do with the
     * point that "Tabs" is itself is just a page with its own instance of ViewController.
     */
    constructor(config: Config, elementRef: ElementRef, viewCtrl: ViewController, navCtrl: NavController, _platform: Platform);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    add(tab: any): boolean;
    /**
     * @param {Number} index Index of the tab you want to select
     */
    select(tabOrIndex: any): any;
    /**
     * @param {Number} index Index of the tab you want to get
     * @returns {Any} Tab Returs the tab who's index matches the one passed
     */
    getByIndex(index: any): any;
    /**
     * @return {Any} Tab Returns the currently selected tab
     */
    getSelected(): any;
    /**
     * @private
     */
    getIndex(tab: any): any;
    /**
     * @private
     * "Touch" the active tab, going back to the root view of the tab
     * or optionally letting the tab handle the event
     */
    _touchActive(tab: any): any;
    /**
     * Returns the root NavController. Returns `null` if Tabs is not
     * within a NavController.
     * @returns {NavController}
     */
    rootNav: any;
}
