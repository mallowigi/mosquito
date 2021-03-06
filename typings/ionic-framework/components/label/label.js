var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var form_1 = require('../../util/form');
/**
 * @name Label
 * @description
 * Labels describe the data that the user should enter in to an input element.
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Username</ion-label>
 *   <input type="text" value="">
 * </ion-input>
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../Input Input API Docs}
 *
 */
var Label = (function () {
    function Label(_form, _elementRef, _renderer) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
    }
    /**
     * @private
     */
    Label.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'lbl-' + this._form.nextId();
        }
    };
    Object.defineProperty(Label.prototype, "text", {
        get: function () {
            return this._elementRef.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Label.prototype.addClass = function (className) {
        this._renderer.setElementClass(this._elementRef, className, true);
    };
    Label = __decorate([
        core_1.Directive({
            selector: 'ion-label',
            inputs: [
                'id'
            ],
            host: {
                '[attr.id]': 'id'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
    ], Label);
    return Label;
    var _a, _b, _c;
})();
exports.Label = Label;