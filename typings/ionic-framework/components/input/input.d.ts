import { ElementRef, Renderer } from 'angular2/core';
import { NavController } from '../nav/nav-controller';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { IonicApp } from '../app/app';
import { Content } from '../content/content';
import { Platform } from '../../platform/platform';
/**
 * @name Input
 * @module ionic
 * @description
 *
 * `ion-input` is a generic wrapper for both inputs and textareas. You can give `ion-input` attributes to tell it how to handle a child `ion-label` component.
 *
 * @property [fixed-label] - a persistant label that sits next the the input
 * @property [floating-label] - a label that will float about the input if the input is empty of looses focus
 * @property [stacked-label] - A stacked label will always appear on top of the input
 * @property [inset] - The input will be inset
 * @property [clearInput] - A clear icon will appear in the input which clears it
 *
 * @usage
 * ```html
 *  <ion-input>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 *
 *  <ion-input clearInput>
 *    <input type="text" placeholder="Username">
 *  </ion-input>
 *
 *  <ion-input fixed-label>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 *
 *  <ion-input floating-label>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 * ```
 *
 */
export declare class ItemInput {
    private _form;
    private _renderer;
    private _elementRef;
    private _app;
    private _platform;
    private _scrollView;
    private _nav;
    /**
     * @private
     */
    clearInput: any;
    value: string;
    constructor(config: Config, _form: Form, _renderer: Renderer, _elementRef: ElementRef, _app: IonicApp, _platform: Platform, _scrollView: Content, _nav: NavController, isFloating: string, isStacked: string, isFixed: string, isInset: string);
    /**
     * @private
     */
    _setInput: any;
    /**
     * @private
     */
    _setLabel: any;
    /**
     * @private
     */
    _buttons: any;
    /**
     * @private
     */
    _icons: any;
    /**
     * @private
     * On Initialization check for attributes
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngAfterViewInit(): void;
    /**
      * @private
     */
    clearTextInput(): void;
    /**
     * @private
     */
    pointerStart(ev: any): void;
    /**
     * @private
     */
    pointerEnd(ev: any): void;
    /**
     * @private
     */
    initFocus(): void;
    /**
     * @private
     */
    setFocus(): void;
    /**
     * @private
     */
    regMove(): void;
    /**
     * @private
     */
    deregMove(): void;
    /**
     * @private
     */
    focusChange(inputHasFocus: any): void;
    /**
     * @private
     */
    hasFocus(): any;
    /**
     * @private
     */
    hasValue(inputValue: any): void;
    /**
     * @private
     * This function is used to add the Angular css classes associated with inputs in forms
     */
    hasClass(className: any): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * @private
     */
    static getScrollData(inputOffsetTop: any, inputOffsetHeight: any, scrollViewDimensions: any, keyboardHeight: any, plaformHeight: any): {
        scrollAmount: number;
        scrollTo: number;
        scrollPadding: number;
        inputSafeY: number;
    };
}
