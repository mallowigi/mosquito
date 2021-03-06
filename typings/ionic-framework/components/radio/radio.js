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
var list_1 = require('../list/list');
var form_1 = require('../../util/form');
var util_1 = require('../../util/util');
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
var RadioButton = (function () {
    function RadioButton(_form, _renderer, _elementRef) {
        this._form = _form;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.value = '';
        this.checked = false;
        this.disabled = false;
        this.select = new core_1.EventEmitter();
        _form.register(this);
    }
    /**
     * @private
     */
    RadioButton.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'rb-' + this._form.nextId();
            this._renderer.setElementAttribute(this._elementRef, 'id', this.id);
        }
        this.labelId = 'lbl-' + this.id;
        this._renderer.setElementAttribute(this._elementRef, 'aria-labelledby', this.labelId);
        var checked = this.checked;
        if (typeof checked === 'string') {
            this.checked = (checked === '' || checked === 'true');
        }
        this.isChecked = this.checked;
        this._renderer.setElementAttribute(this._elementRef, 'checked', null);
    };
    /**
     * @private
     */
    RadioButton.prototype._click = function () {
        console.debug('RadioButton, select', this.value);
        this.select.emit(this);
    };
    Object.defineProperty(RadioButton.prototype, "isChecked", {
        set: function (isChecked) {
            this._renderer.setElementAttribute(this._elementRef, 'aria-checked', isChecked);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    RadioButton.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadioButton.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioButton.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RadioButton.prototype, "id", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], RadioButton.prototype, "select", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], RadioButton.prototype, "_click", null);
    RadioButton = __decorate([
        core_1.Component({
            selector: 'ion-radio',
            host: {
                'role': 'radio',
                'class': 'item',
                'tappable': '',
                'tabindex': 0,
                '[attr.aria-disabled]': 'disabled'
            },
            template: '<div class="item-inner">' +
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '<div class="radio-media">' +
                '<div class="radio-icon"></div>' +
                '</div>' +
                '</div>'
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object, (typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object])
    ], RadioButton);
    return RadioButton;
    var _a, _b, _c, _d;
})();
exports.RadioButton = RadioButton;
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
var RadioGroup = (function () {
    function RadioGroup(ngControl, _renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.change = new core_1.EventEmitter();
        this.id = ++radioGroupIds;
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    RadioGroup.prototype.writeValue = function (value) {
        this.value = util_1.isDefined(value) ? value : '';
        if (this._buttons) {
            var buttons = this._buttons.toArray();
            for (var _i = 0; _i < buttons.length; _i++) {
                var button = buttons[_i];
                var isChecked = (button.value === this.value);
                button.isChecked = isChecked;
                if (isChecked) {
                    this._renderer.setElementAttribute(this._elementRef, 'aria-activedescendant', button.id);
                }
            }
        }
    };
    /**
     * @private
     */
    RadioGroup.prototype.onChange = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     */
    RadioGroup.prototype.onTouched = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    RadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks the model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    RadioGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        var header = this._header;
        if (header) {
            if (!header.id) {
                header.id = 'rg-hdr-' + this.id;
            }
            this._renderer.setElementAttribute(this._elementRef, 'aria-describedby', header.id);
        }
        var buttons = this._buttons.toArray();
        for (var _i = 0; _i < buttons.length; _i++) {
            var button = buttons[_i];
            button.select.subscribe(function () {
                _this.writeValue(button.value);
                _this.onChange(button.value);
                _this.change.emit(_this);
            });
            if (util_1.isDefined(this.value)) {
                var isChecked = (button.value === this.value) || button.checked;
                button.isChecked = isChecked;
                if (isChecked) {
                    this.writeValue(button.value);
                    //this.onChange(button.value);
                    this._renderer.setElementAttribute(this._elementRef, 'aria-activedescendant', button.id);
                }
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], RadioGroup.prototype, "change", void 0);
    __decorate([
        core_1.ContentChildren(RadioButton), 
        __metadata('design:type', Object)
    ], RadioGroup.prototype, "_buttons", void 0);
    __decorate([
        core_1.ContentChild(list_1.ListHeader), 
        __metadata('design:type', Object)
    ], RadioGroup.prototype, "_header", void 0);
    RadioGroup = __decorate([
        core_1.Directive({
            selector: '[radio-group]',
            host: {
                '[attr.aria-activedescendant]': 'activeId',
                'role': 'radiogroup'
            }
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_b = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object, (typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object])
    ], RadioGroup);
    return RadioGroup;
    var _a, _b, _c, _d;
})();
exports.RadioGroup = RadioGroup;
var radioGroupIds = -1;