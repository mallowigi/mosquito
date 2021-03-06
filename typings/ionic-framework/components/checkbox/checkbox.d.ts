import { ElementRef, Renderer } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Form } from '../../util/form';
/**
 * The checkbox is no different than the HTML checkbox input, except it's styled differently.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/core/Form-interface.html) for more info on forms and input.
 *
 * @property [checked] - whether or not the checkbox is checked (defaults to false)
 * @property [value] - the value of the checkbox component
 * @property [disabled] - whether or not the checkbox is disabled or not.
 *
 * @usage
 * ```html
 * <ion-checkbox checked="true" value="isChecked" ngControl="htmlCtrl">
 *   HTML5
 * </ion-checkbox>
 * ```
 * @demo /docs/v2/demos/checkbox/
 * @see {@link /docs/v2/components#checkbox Checkbox Component Docs}
 */
export declare class Checkbox {
    private _form;
    private _elementRef;
    private _renderer;
    value: string;
    checked: any;
    disabled: boolean;
    id: string;
    constructor(_form: Form, _elementRef: ElementRef, _renderer: Renderer, ngControl: NgControl);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     * Toggle the checked state of the checkbox. Calls onChange to pass the updated checked state to the model (Control).
     */
    toggle(): void;
    checked: boolean;
    /**
     * @private
     */
    _click(ev: any): void;
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
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
