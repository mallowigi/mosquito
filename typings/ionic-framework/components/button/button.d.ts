import { ElementRef, Renderer } from 'angular2/core';
import { Config } from '../../config/config';
/**
  * @name Button
  * @module ionic
  * @property [outline] - for an unfilled outline button
  * @property [clear] - for a transparent button that only shows text and icons
  * @property [round] - for a button with rounded corners
  * @property [block] - for a block button that fills it's parent container
  * @property [full] - for a full width button
  * @property [small] - sets button size to small
  * @property [large] - sets button size to large
  * @property [disabled] - disables the button
  * @property [fab] - for a floating action button
  * @property [fab-left] - position a fab button to the left
  * @property [fab-right] - position a fab button to the right
  * @property [fab-center] - position a fab button towards the center
  * @property [fab-top] - position a fab button towards the top
  * @property [fab-bottom] - position a fab button towards the bottom
  * @property [color] - Dynamically set which color attribute this button should use.
  * @description
  * Buttons are simple components in Ionic, can consist of text, an icon, or both, and can be enhanced with a wide range of attributes.
  * @demo /docs/v2/demos/buttons/
  * @see {@link /docs/v2/components#buttons Button Component Docs}

 */
export declare class Button {
    private _elementRef;
    private _renderer;
    constructor(config: Config, _elementRef: ElementRef, _renderer: Renderer, ionItem: string);
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    ngAfterContentChecked(): void;
    /**
     * @private
     */
    addClass(className: any): void;
    /**
     * @private
     */
    setRole(val: any): void;
    _readIcon(element: any): void;
    _readAttrs(element: any): void;
    _assignCss(assignCssClass: any): void;
    _setClass(type: any, assignCssClass: any): void;
    /**
     * @private
     */
    static setRoles(contentButtonChildren: any, role: any): void;
}
