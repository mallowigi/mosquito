import { ElementRef, Renderer } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Form } from '../../util/form';
import { Label } from '../label/label';
import { NavController } from '../nav/nav-controller';
/**
 * @name Select
 * @description
 * The `ion-select` component is similar to an HTML `<select>` element, however,
 * Ionic's select component makes it easier for users to sort through and select
 * the preferred option or options. When users tap the select component, a
 * dialog will appear with all of the options in a large, easy to select list
 * for users.
 *
 * Under-the-hood the `ion-select` actually uses the
 * {@link ../../alert/Alert Alert API} to open up the overlay of options
 * which the user is presented with. Select takes one child `ion-label`
 * component, and numerous child `ion-option` components. Each `ion-option`
 * should be given a `value` attribute.
 *
 * ### Single Value: Radio Buttons
 *
 * The standard `ion-select` component allows the user to select only one
 * option. When selecting only one option the alert overlay presents users with
 * a radio button styled list of options. The `ion-select` component's value
 * receives the value of the selected option's value.
 *
 * ```html
 * <ion-select [(ngModel)]="gender">
 *   <ion-label>Gender</ion-label>
 *   <ion-option value="f" checked="true">Female</ion-option>
 *   <ion-option value="m">Male</ion-option>
 * </ion-select>
 * ```
 *
 * ### Multiple Value: Checkboxes
 *
 * By adding the `multiple="true"` attribute to `ion-select`, users are able
 * to select multiple options. When multiple options can be selected, the alert
 * overlay presents users with a checkbox styled list of options. The
 * `ion-select multiple="true"` component's value receives an array of all the
 * selected option values.
 *
 * ```html
 * <ion-select [(ngModel)]="toppings" multiple="true">
 *   <ion-label>Toppings</ion-label>
 *   <ion-option value="bacon">Bacon</ion-option>
 *   <ion-option value="olives">Black Olives</ion-option>
 *   <ion-option value="xcheese">Extra Cheese</ion-option>
 *   <ion-option value="mushrooms">Mushrooms</ion-option>
 *   <ion-option value="pepperoni">Pepperoni</ion-option>
 *   <ion-option value="sausage">Sausage</ion-option>
 * </ion-select>
 * ```
 *
 * ### Alert Buttons
 * By default, the two buttons read `Cancel` and `OK`. The each button's text
 * can be customized using the `cancelText` and `okText` attributes:
 *
 * ```html
 * <ion-select okText="Okay" cancelText="Dismiss">
 *   ...
 * </ion-select>
 * ```
 *
 * ### Alert Options
 *
 * Remember how `ion-select` is really just a wrapper to `Alert`? By using
 * the `alertOptions` property you can pass custom options to the alert
 * overlay. This would be useful if there is a custom alert title,
 * subtitle or message. {@link ../../alert/Alert Alert API}
 *
 * ```html
 * <ion-select [alertOptions]="alertOptions">
 *   ...
 * </ion-select>
 * ```
 *
 * ```ts
 * this.alertOptions = {
 *   title: 'Pizza Toppings',
 *   subTitle: 'Select your toppings'
 * };
 * ```
 *
 */
export declare class Select {
    private _form;
    private _elementRef;
    private _renderer;
    private _navCtrl;
    cancelText: string;
    okText: string;
    value: string;
    alertOptions: any;
    checked: any;
    disabled: boolean;
    id: string;
    multiple: string;
    label: Label;
    options: any;
    constructor(_form: Form, _elementRef: ElementRef, _renderer: Renderer, _navCtrl: NavController, ngControl: NgControl);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    _click(): void;
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
