import { ElementRef, Renderer, EventEmitter } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Form } from '../../util/form';
/**
 * @description
 * A radio button with a unique value. Note that all `<ion-radio>` components
 * must be wrapped within a `<ion-list radio-group>`, and there must be at
 * least two `<ion-radio>` components within the radio group.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-radio value="my-value" checked="true">
 *   Radio Label
 * </ion-radio>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 */
export declare class RadioButton {
    private _form;
    private _renderer;
    private _elementRef;
    value: string;
    checked: any;
    disabled: boolean;
    id: string;
    select: EventEmitter<RadioButton>;
    labelId: any;
    constructor(_form: Form, _renderer: Renderer, _elementRef: ElementRef);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    private _click();
    isChecked: any;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
/**
 * A radio group is a group of radio components.
 *
 * Selecting a radio button in the group unselects all others in the group.
 *
 * New radios can be registered dynamically.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group ngControl="autoManufacturers">
 *
 *   <ion-list-header>
 *     Auto Manufacturers
 *   </ion-list-header>
 *
 *   <ion-radio value="cord">
 *     Cord
 *   </ion-radio>
 *
 *   <ion-radio value="duesenberg" checked="true">
 *     Duesenberg
 *   </ion-radio>
 *
 *   <ion-radio value="hudson">
 *     Hudson
 *   </ion-radio>
 *
 *   <ion-radio value="packard">
 *     Packard
 *   </ion-radio>
 *
 *   <ion-radio value="studebaker">
 *     Studebaker
 *   </ion-radio>
 *
 *   <ion-radio value="tucker">
 *     Tucker
 *   </ion-radio>
 *
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
*/
export declare class RadioGroup {
    private _renderer;
    private _elementRef;
    change: EventEmitter<RadioGroup>;
    private _buttons;
    private _header;
    id: any;
    value: any;
    constructor(ngControl: NgControl, _renderer: Renderer, _elementRef: ElementRef);
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    writeValue(value: any): void;
    /**
     * @private
     */
    onChange(val: any): void;
    /**
     * @private
     */
    onTouched(val: any): void;
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    registerOnChange(fn: any): void;
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks the model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
}
