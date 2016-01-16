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
var dom_1 = require('../../util/dom');
/**
 * @private
 */
var TextInput = (function () {
    function TextInput(type, _elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.valueChange = new core_1.EventEmitter();
        this.focusChange = new core_1.EventEmitter();
        this.type = type || 'text';
    }
    TextInput.prototype.ngOnInit = function () {
        if (this.ngModel) {
            this.value = this.ngModel;
        }
        else {
            this.value = this._elementRef.nativeElement.value;
        }
    };
    TextInput.prototype._keyup = function (ev) {
        this.valueChange.emit(ev.target.value);
    };
    TextInput.prototype._focus = function () {
        this.focusChange.emit(true);
    };
    TextInput.prototype._blur = function () {
        this.focusChange.emit(false);
        this.hideFocus(false);
    };
    TextInput.prototype.labelledBy = function (val) {
        this._renderer.setElementAttribute(this._elementRef, 'aria-labelledby', val);
    };
    TextInput.prototype.setFocus = function () {
        this.element().focus();
    };
    TextInput.prototype.relocate = function (shouldRelocate, inputRelativeY) {
        if (this._relocated !== shouldRelocate) {
            var focusedInputEle = this.element();
            if (shouldRelocate) {
                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-input');
                focusedInputEle.classList.add('hide-focused-input');
                focusedInputEle.style[dom_1.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                this.setFocus();
            }
            else {
                focusedInputEle.classList.remove('hide-focused-input');
                focusedInputEle.style[dom_1.CSS.transform] = '';
                var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-input');
                if (clonedInputEle) {
                    clonedInputEle.parentNode.removeChild(clonedInputEle);
                }
            }
            this._relocated = shouldRelocate;
        }
    };
    TextInput.prototype.hideFocus = function (shouldHideFocus) {
        var focusedInputEle = this.element();
        if (shouldHideFocus) {
            var clonedInputEle = cloneInput(focusedInputEle, 'cloned-hidden');
            focusedInputEle.classList.add('hide-focused-input');
            focusedInputEle.style[dom_1.CSS.transform] = 'translate3d(-9999px,0,0)';
            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
        }
        else {
            focusedInputEle.classList.remove('hide-focused-input');
            focusedInputEle.style[dom_1.CSS.transform] = '';
            var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-hidden');
            if (clonedInputEle) {
                clonedInputEle.parentNode.removeChild(clonedInputEle);
            }
        }
    };
    TextInput.prototype.hasFocus = function () {
        return dom_1.hasFocus(this.element());
    };
    TextInput.prototype.addClass = function (className) {
        this._renderer.setElementClass(this._elementRef, className, true);
    };
    TextInput.prototype.hasClass = function (className) {
        this._elementRef.nativeElement.classList.contains(className);
    };
    TextInput.prototype.element = function () {
        return this._elementRef.nativeElement;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TextInput.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TextInput.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], TextInput.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
    ], TextInput.prototype, "focusChange", void 0);
    __decorate([
        core_1.HostListener('keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TextInput.prototype, "_keyup", null);
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TextInput.prototype, "_focus", null);
    __decorate([
        core_1.HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TextInput.prototype, "_blur", null);
    TextInput = __decorate([
        core_1.Directive({
            selector: 'textarea,input[type=text],input[type=password],input[type=number],input[type=search],input[type=email],input[type=url],input[type=tel],input[type=date],input[type=datetime],input[type=datetime-local],input[type=week],input[type=time]',
            host: {
                'class': 'text-input'
            }
        }),
        __param(0, core_1.Attribute('type')), 
        __metadata('design:paramtypes', [String, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
    ], TextInput);
    return TextInput;
    var _a, _b, _c, _d;
})();
exports.TextInput = TextInput;
function cloneInput(srcInput, addCssClass) {
    var clonedInputEle = srcInput.cloneNode(true);
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.classList.remove('hide-focused-input');
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    return clonedInputEle;
}