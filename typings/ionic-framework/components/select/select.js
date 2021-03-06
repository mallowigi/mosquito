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
var common_1 = require('angular2/common');
var alert_1 = require('../alert/alert');
var form_1 = require('../../util/form');
var label_1 = require('../label/label');
var util_1 = require('../../util/util');
var nav_controller_1 = require('../nav/nav-controller');
var option_1 = require('../option/option');
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
var Select = (function () {
    function Select(_form, _elementRef, _renderer, _navCtrl, ngControl) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._navCtrl = _navCtrl;
        this.cancelText = 'Cancel';
        this.okText = 'OK';
        this.value = '';
        this.alertOptions = {};
        this.checked = false;
        this.disabled = false;
        this.id = '';
        this.multiple = '';
        _form.register(this);
        this.selectedText = '';
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        if (!_navCtrl) {
            console.error('parent <ion-nav> required for <ion-select>');
        }
    }
    /**
     * @private
     */
    Select.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'sel-' + this._form.nextId();
            this._renderer.setElementAttribute(this._elementRef, 'id', this.id);
        }
        this.labelId = 'lbl-' + this.id;
        this._renderer.setElementAttribute(this._elementRef, 'aria-labelledby', this.labelId);
    };
    /**
     * @private
     */
    Select.prototype.ngAfterContentInit = function () {
        var _this = this;
        var selectedOption = this.options.toArray().find(function (o) { return o.checked; });
        if (!selectedOption) {
            this.options.toArray().forEach(function (o) {
                o.checked = o.value === _this.value + '';
                if (o.checked) {
                    selectedOption = o;
                }
            });
        }
        if (selectedOption) {
            this.value = selectedOption.value;
            this.selectedText = selectedOption.text;
            setTimeout(function () {
                _this.onChange(_this.value);
            });
        }
    };
    /**
     * @private
     */
    Select.prototype._click = function () {
        var _this = this;
        var isMulti = (this.multiple === true || this.multiple === 'true');
        // the user may have assigned some options specifically for the alert
        var alertOptions = util_1.merge({}, this.alertOptions);
        // make sure their buttons array is removed from the options
        // and we create a new array for the alert's two buttons
        alertOptions.buttons = [this.cancelText];
        // if the alertOptions didn't provide an title then use the label's text
        if (!alertOptions.title) {
            alertOptions.title = this.label.text;
        }
        // user cannot provide inputs from alertOptions
        // alert inputs must be created by ionic from ion-options
        alertOptions.inputs = this.options.toArray().map(function (input) {
            return {
                type: (isMulti ? 'checkbox' : 'radio'),
                label: input.text,
                value: input.value,
                checked: !!input.checked
            };
        });
        // create the alert instance from our built up alertOptions
        var alert = alert_1.Alert.create(alertOptions);
        if (isMulti) {
            // use checkboxes
            alert.setCssClass('select-alert multiple-select-alert');
            alert.addButton({
                text: this.okText,
                handler: function (selectedValues) {
                    // passed an array of all the values which were checked
                    _this.value = selectedValues;
                    // keep a list of all the selected texts
                    var selectedTexts = [];
                    _this.options.toArray().forEach(function (option) {
                        if (selectedValues.indexOf(option.value) > -1) {
                            // this option is one that was checked
                            option.checked = true;
                            selectedTexts.push(option.text);
                        }
                        else {
                            // this option was not checked
                            option.checked = false;
                        }
                    });
                    _this.selectedText = selectedTexts.join(', ');
                    _this.onChange(selectedValues);
                }
            });
        }
        else {
            // use radio buttons
            alert.setCssClass('select-alert single-select-alert');
            alert.addButton({
                text: this.okText,
                handler: function (selectedValue) {
                    // passed the single value that was checked
                    // or undefined if nothing was checked
                    _this.value = selectedValue;
                    _this.selectedText = '';
                    _this.options.toArray().forEach(function (option) {
                        if (option.value === selectedValue) {
                            // this option was the one that was checked
                            option.checked = true;
                            _this.selectedText = option.text;
                        }
                        else {
                            // this option was not checked
                            option.checked = false;
                        }
                    });
                    _this.onChange(selectedValue);
                }
            });
        }
        this._navCtrl.present(alert);
    };
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    Select.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @private
     */
    Select.prototype.onChange = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     */
    Select.prototype.onTouched = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    Select.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Select.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "cancelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "okText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "alertOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Select.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "multiple", void 0);
    __decorate([
        core_1.ContentChild(label_1.Label), 
        __metadata('design:type', (typeof (_a = typeof label_1.Label !== 'undefined' && label_1.Label) === 'function' && _a) || Object)
    ], Select.prototype, "label", void 0);
    __decorate([
        core_1.ContentChildren(option_1.Option), 
        __metadata('design:type', Object)
    ], Select.prototype, "options", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Select.prototype, "_click", null);
    Select = __decorate([
        core_1.Component({
            selector: 'ion-select',
            host: {
                'class': 'item',
                'tappable': '',
                'tabindex': 0,
                '[attr.aria-disabled]': 'disabled'
            },
            template: '<ng-content select="[item-left]"></ng-content>' +
                '<div class="item-inner">' +
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content select="ion-label"></ng-content>' +
                '</ion-item-content>' +
                '<div class="select-text-value" item-right>{{selectedText}}</div>' +
                '<div class="select-icon" item-right></div>' +
                '</div>'
        }),
        __param(3, core_1.Optional()),
        __param(4, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_b = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object, (typeof (_e = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _e) || Object, (typeof (_f = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _f) || Object])
    ], Select);
    return Select;
    var _a, _b, _c, _d, _e, _f;
})();
exports.Select = Select;