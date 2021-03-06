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
/**
 * @name Option
 */
var Option = (function () {
    function Option(_elementRef) {
        this._elementRef = _elementRef;
        this._checked = false;
    }
    Object.defineProperty(Option.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (val) {
            this._checked = (val === 'true' || val === true || val === '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Option.prototype, "text", {
        get: function () {
            return this._elementRef.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Option.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Option.prototype, "checked", void 0);
    Option = __decorate([
        core_1.Directive({
            selector: 'ion-option'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], Option);
    return Option;
    var _a;
})();
exports.Option = Option;