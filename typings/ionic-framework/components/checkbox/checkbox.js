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
var form_1 = require('../../util/form');
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
var Checkbox = (function () {
    function Checkbox(_form, _elementRef, _renderer, ngControl) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.value = '';
        this.checked = false;
        this.disabled = false;
        _form.register(this);
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @private
     */
    Checkbox.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'chk-' + this._form.nextId();
            this._renderer.setElementAttribute(this._elementRef, 'id', this.id);
        }
        this.labelId = 'lbl-' + this.id;
        this._renderer.setElementAttribute(this._elementRef, 'aria-labelledby', this.labelId);
    };
    /**
     * @private
     * Toggle the checked state of the checkbox. Calls onChange to pass the updated checked state to the model (Control).
     */
    Checkbox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    Object.defineProperty(Checkbox.prototype, "checked", {
        get: function () {
            return !!this._checked;
        },
        set: function (val) {
            this._checked = !!val;
            this._renderer.setElementAttribute(this._elementRef, 'aria-checked', this._checked);
            this.onChange(this._checked);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Checkbox.prototype._click = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.toggle();
    };
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    Checkbox.prototype.writeValue = function (value) {
        this.checked = value;
    };
    /**
     * @private
     */
    Checkbox.prototype.onChange = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     */
    Checkbox.prototype.onTouched = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    Checkbox.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    Checkbox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Checkbox.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Checkbox.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Checkbox.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Checkbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Checkbox.prototype, "id", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Checkbox.prototype, "_click", null);
    Checkbox = __decorate([
        core_1.Component({
            selector: 'ion-checkbox',
            host: {
                'role': 'checkbox',
                'class': 'item',
                'tappable': '',
                'tabindex': 0,
                '[attr.aria-disabled]': 'disabled'
            },
            template: '<div class="item-inner">' +
                '<div class="checkbox-media" disable-activated>' +
                '<div class="checkbox-icon"></div>' +
                '</div>' +
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '</div>'
        }),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object, (typeof (_d = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _d) || Object])
    ], Checkbox);
    return Checkbox;
    var _a, _b, _c, _d;
})();
exports.Checkbox = Checkbox;