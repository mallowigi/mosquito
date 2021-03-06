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
var nav_controller_1 = require('../nav/nav-controller');
var config_1 = require('../../config/config');
var form_1 = require('../../util/form');
var label_1 = require('../label/label');
var text_input_1 = require('../text-input/text-input');
var app_1 = require('../app/app');
var content_1 = require('../content/content');
var dom_1 = require('../../util/dom');
var platform_1 = require('../../platform/platform');
var button_1 = require('../button/button');
var icon_1 = require('../icon/icon');
/**
 * @name Input
 * @module ionic
 * @description
 *
 * `ion-input` is a generic wrapper for both inputs and textareas. You can give `ion-input` attributes to tell it how to handle a child `ion-label` component.
 *
 * @property [fixed-label] - a persistant label that sits next the the input
 * @property [floating-label] - a label that will float about the input if the input is empty of looses focus
 * @property [stacked-label] - A stacked label will always appear on top of the input
 * @property [inset] - The input will be inset
 * @property [clearInput] - A clear icon will appear in the input which clears it
 *
 * @usage
 * ```html
 *  <ion-input>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 *
 *  <ion-input clearInput>
 *    <input type="text" placeholder="Username">
 *  </ion-input>
 *
 *  <ion-input fixed-label>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 *
 *  <ion-input floating-label>
 *    <ion-label>Username</ion-label>
 *    <input type="text" value="">
 *  </ion-input>
 * ```
 *
 */
var ItemInput = (function () {
    function ItemInput(config, _form, _renderer, _elementRef, _app, _platform, _scrollView, _nav, isFloating, isStacked, isFixed, isInset) {
        this._form = _form;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._app = _app;
        this._platform = _platform;
        this._scrollView = _scrollView;
        this._nav = _nav;
        this.value = '';
        _form.register(this);
        this.type = null;
        this.lastTouch = 0;
        // make more gud with pending @Attributes API
        this.displayType = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
        this._assist = config.get('scrollAssist');
        this.keyboardHeight = config.get('keyboardHeight');
    }
    Object.defineProperty(ItemInput.prototype, "_setInput", {
        /**
         * @private
         */
        set: function (textInput) {
            var _this = this;
            if (textInput) {
                textInput.addClass('item-input');
                if (this.displayType) {
                    textInput.addClass(this.displayType + '-input');
                }
                this.input = textInput;
                this.type = textInput.type;
                this.hasValue(this.input.value);
                textInput.valueChange.subscribe(function (inputValue) {
                    _this.hasValue(inputValue);
                });
                this.focusChange(this.hasFocus());
                textInput.focusChange.subscribe(function (textInputHasFocus) {
                    _this.focusChange(textInputHasFocus);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInput.prototype, "_setLabel", {
        /**
         * @private
         */
        set: function (label) {
            if (label && this.displayType) {
                label.addClass(this.displayType + '-label');
            }
            this.label = label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInput.prototype, "_buttons", {
        /**
         * @private
         */
        set: function (buttons) {
            buttons.toArray().forEach(function (button) {
                if (!button.isItem) {
                    button.addClass('item-button');
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInput.prototype, "_icons", {
        /**
         * @private
         */
        set: function (icons) {
            icons.toArray().forEach(function (icon) {
                icon.addClass('item-icon');
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * On Initialization check for attributes
     */
    ItemInput.prototype.ngOnInit = function () {
        var clearInput = this.clearInput;
        if (typeof clearInput === 'string') {
            this.clearInput = (clearInput === '' || clearInput === 'true');
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.ngAfterViewInit = function () {
        var self = this;
        if (self.input && self.label) {
            // if there is an input and a label
            // then give the label an ID
            // and tell the input the ID of who it's labelled by
            self.input.labelledBy(self.label.id);
        }
        self.scrollMove = function (ev) {
            if (!(self._nav && self._nav.isTransitioning())) {
                self.deregMove();
                if (self.hasFocus()) {
                    self.input.hideFocus(true);
                    self._scrollView.onScrollEnd(function () {
                        self.input.hideFocus(false);
                        if (self.hasFocus()) {
                            self.regMove();
                        }
                    });
                }
            }
        };
    };
    /**
      * @private
     */
    ItemInput.prototype.clearTextInput = function () {
        console.log("Should clear input");
        //console.log(this.textInput.value);
    };
    /**
     * @private
     */
    ItemInput.prototype.pointerStart = function (ev) {
        if (this._assist && this._app.isEnabled()) {
            // remember where the touchstart/mousedown started
            this.startCoord = dom_1.pointerCoord(ev);
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.pointerEnd = function (ev) {
        if (!this._app.isEnabled()) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (this._assist && ev.type === 'touchend') {
            // get where the touchend/mouseup ended
            var endCoord = dom_1.pointerCoord(ev);
            // focus this input if the pointer hasn't moved XX pixels
            // and the input doesn't already have focus
            if (!dom_1.hasPointerMoved(8, this.startCoord, endCoord) && !this.hasFocus()) {
                ev.preventDefault();
                ev.stopPropagation();
                this.initFocus();
                // temporarily prevent mouseup's from focusing
                this.lastTouch = Date.now();
            }
        }
        else if (this.lastTouch + 999 < Date.now()) {
            ev.preventDefault();
            ev.stopPropagation();
            this.setFocus();
            this.regMove();
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.initFocus = function () {
        // begin the process of setting focus to the inner input element
        var _this = this;
        var scrollView = this._scrollView;
        if (scrollView && this._assist) {
            // this input is inside of a scroll view
            // find out if text input should be manually scrolled into view
            var ele = this._elementRef.nativeElement;
            var scrollData = ItemInput.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getDimensions(), this.keyboardHeight, this._platform.height());
            if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
                // the text input is in a safe position that doesn't require
                // it to be scrolled into view, just set focus now
                this.setFocus();
                this.regMove();
                return;
            }
            // add padding to the bottom of the scroll view (if needed)
            scrollView.addScrollPadding(scrollData.scrollPadding);
            // manually scroll the text input to the top
            // do not allow any clicks while it's scrolling
            var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
            this._app.setEnabled(false, scrollDuration);
            this._nav && this._nav.setTransitioning(true, scrollDuration);
            // temporarily move the focus to the focus holder so the browser
            // doesn't freak out while it's trying to get the input in place
            // at this point the native text input still does not have focus
            this.input.relocate(true, scrollData.inputSafeY);
            // scroll the input into place
            scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
                // the scroll view is in the correct position now
                // give the native text input focus
                _this.input.relocate(false);
                // all good, allow clicks again
                _this._app.setEnabled(true);
                _this._nav && _this._nav.setTransitioning(false);
                _this.regMove();
            });
        }
        else {
            // not inside of a scroll view, just focus it
            this.setFocus();
            this.regMove();
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.setFocus = function () {
        if (this.input) {
            this._form.setAsFocused(this);
            // set focus on the actual input element
            this.input.setFocus();
            // ensure the body hasn't scrolled down
            document.body.scrollTop = 0;
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.regMove = function () {
        var _this = this;
        if (this._assist && this._scrollView) {
            setTimeout(function () {
                _this.deregMove();
                _this.deregScroll = _this._scrollView.addScrollEventListener(_this.scrollMove);
            }, 80);
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.deregMove = function () {
        this.deregScroll && this.deregScroll();
    };
    /**
     * @private
     */
    ItemInput.prototype.focusChange = function (inputHasFocus) {
        this._renderer.setElementClass(this._elementRef, 'input-focused', inputHasFocus);
        if (!inputHasFocus) {
            this.deregMove();
        }
    };
    /**
     * @private
     */
    ItemInput.prototype.hasFocus = function () {
        return !!this.input && this.input.hasFocus();
    };
    /**
     * @private
     */
    ItemInput.prototype.hasValue = function (inputValue) {
        var inputHasValue = !!(inputValue && inputValue !== '');
        this._renderer.setElementClass(this._elementRef, 'input-has-value', inputHasValue);
    };
    /**
     * @private
     * This function is used to add the Angular css classes associated with inputs in forms
     */
    ItemInput.prototype.hasClass = function (className) {
        this.input && this.input.hasClass(className);
    };
    /**
     * @private
     */
    ItemInput.prototype.ngOnDestroy = function () {
        this.deregMove();
        this._form.deregister(this);
    };
    /**
     * @private
     */
    ItemInput.getScrollData = function (inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
        // compute input's Y values relative to the body
        var inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
        var inputBottom = (inputTop + inputOffsetHeight);
        // compute the safe area which is the viewable content area when the soft keyboard is up
        var safeAreaTop = scrollViewDimensions.contentTop;
        var safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
        safeAreaHeight /= 2;
        var safeAreaBottom = safeAreaTop + safeAreaHeight;
        var inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
        var inputTopAboveSafeArea = (inputTop < safeAreaTop);
        var inputTopBelowSafeArea = (inputTop > safeAreaBottom);
        var inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
        var inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
        /*
        Text Input Scroll To Scenarios
        ---------------------------------------
        1) Input top within safe area, bottom within safe area
        2) Input top within safe area, bottom below safe area, room to scroll
        3) Input top above safe area, bottom within safe area, room to scroll
        4) Input top below safe area, no room to scroll, input smaller than safe area
        5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
        6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
        7) Input top below safe area, no room to scroll, input larger than safe area
        */
        var scrollData = {
            scrollAmount: 0,
            scrollTo: 0,
            scrollPadding: 0,
            inputSafeY: 0
        };
        if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
            // Input top within safe area, bottom within safe area
            // no need to scroll to a position, it's good as-is
            return scrollData;
        }
        // looks like we'll have to do some auto-scrolling
        if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
            // Input top and bottom below safe area
            // auto scroll the input up so at least the top of it shows
            if (safeAreaHeight > inputOffsetHeight) {
                // safe area height is taller than the input height, so we
                // can bring it up the input just enough to show the input bottom
                scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
            }
            else {
                // safe area height is smaller than the input height, so we can
                // only scroll it up so the input top is at the top of the safe area
                // however the input bottom will be below the safe area
                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            }
            scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
        }
        else if (inputTopAboveSafeArea) {
            // Input top above safe area
            // auto scroll the input down so at least the top of it shows
            scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            scrollData.inputSafeY = (safeAreaTop - inputTop) + 4;
        }
        // figure out where it should scroll to for the best position to the input
        scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
        if (scrollData.scrollAmount < 0) {
            // when auto-scrolling up, there also needs to be enough
            // content padding at the bottom of the scroll view
            // manually add it if there isn't enough scrollable area
            // figure out how many scrollable area is left to scroll up
            var availablePadding = (scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop) - scrollViewDimensions.contentHeight;
            var paddingSpace = availablePadding + scrollData.scrollAmount;
            if (paddingSpace < 0) {
                // there's not enough scrollable area at the bottom, so manually add more
                scrollData.scrollPadding = (scrollViewDimensions.contentHeight - safeAreaHeight);
            }
        }
        // if (!window.safeAreaEle) {
        //   window.safeAreaEle = document.createElement('div');
        //   window.safeAreaEle.style.position = 'absolute';
        //   window.safeAreaEle.style.background = 'rgba(0, 128, 0, 0.7)';
        //   window.safeAreaEle.style.padding = '2px 5px';
        //   window.safeAreaEle.style.textShadow = '1px 1px white';
        //   window.safeAreaEle.style.left = '0px';
        //   window.safeAreaEle.style.right = '0px';
        //   window.safeAreaEle.style.fontWeight = 'bold';
        //   window.safeAreaEle.style.pointerEvents = 'none';
        //   document.body.appendChild(window.safeAreaEle);
        // }
        // window.safeAreaEle.style.top = safeAreaTop + 'px';
        // window.safeAreaEle.style.height = safeAreaHeight + 'px';
        // window.safeAreaEle.innerHTML = `
        //   <div>scrollTo: ${scrollData.scrollTo}</div>
        //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
        //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
        //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
        //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
        //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
        //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
        // `;
        return scrollData;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ItemInput.prototype, "clearInput", void 0);
    __decorate([
        core_1.ContentChild(text_input_1.TextInput), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ItemInput.prototype, "_setInput", null);
    __decorate([
        core_1.ContentChild(label_1.Label), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ItemInput.prototype, "_setLabel", null);
    __decorate([
        core_1.ContentChildren(button_1.Button), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ItemInput.prototype, "_buttons", null);
    __decorate([
        core_1.ContentChildren(icon_1.Icon), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ItemInput.prototype, "_icons", null);
    ItemInput = __decorate([
        core_1.Component({
            selector: 'ion-input',
            host: {
                '(touchstart)': 'pointerStart($event)',
                '(touchend)': 'pointerEnd($event)',
                '(mouseup)': 'pointerEnd($event)',
                'class': 'item',
                '[class.ng-untouched]': 'hasClass("ng-untouched")',
                '[class.ng-touched]': 'hasClass("ng-touched")',
                '[class.ng-pristine]': 'hasClass("ng-pristine")',
                '[class.ng-dirty]': 'hasClass("ng-dirty")',
                '[class.ng-valid]': 'hasClass("ng-valid")',
                '[class.ng-invalid]': 'hasClass("ng-invalid")'
            },
            template: '<div class="item-inner">' +
                '<ng-content></ng-content>' +
                '<input [type]="type" aria-hidden="true" scroll-assist *ngIf="_assist">' +
                '<button clear *ngIf="clearInput && value" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>' +
                '</div>',
            directives: [common_1.NgIf, core_1.forwardRef(function () { return InputScrollAssist; }), text_input_1.TextInput, button_1.Button]
        }),
        __param(6, core_1.Optional()),
        __param(6, core_1.Host()),
        __param(7, core_1.Optional()),
        __param(8, core_1.Attribute('floating-label')),
        __param(9, core_1.Attribute('stacked-label')),
        __param(10, core_1.Attribute('fixed-label')),
        __param(11, core_1.Attribute('inset')), 
        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object, (typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object, (typeof (_e = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _e) || Object, (typeof (_f = typeof platform_1.Platform !== 'undefined' && platform_1.Platform) === 'function' && _f) || Object, (typeof (_g = typeof content_1.Content !== 'undefined' && content_1.Content) === 'function' && _g) || Object, (typeof (_h = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _h) || Object, String, String, String, String])
    ], ItemInput);
    return ItemInput;
    var _a, _b, _c, _d, _e, _f, _g, _h;
})();
exports.ItemInput = ItemInput;
/**
 * @private
 */
var InputScrollAssist = (function () {
    function InputScrollAssist(_form, _input) {
        this._form = _form;
        this._input = _input;
    }
    InputScrollAssist.prototype.receivedFocus = function () {
        this._form.focusNext(this._input);
    };
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], InputScrollAssist.prototype, "receivedFocus", null);
    InputScrollAssist = __decorate([
        core_1.Directive({
            selector: '[scroll-assist]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, ItemInput])
    ], InputScrollAssist);
    return InputScrollAssist;
    var _a;
})();
var SCROLL_ASSIST_SPEED = 0.4;
function getScrollAssistDuration(distanceToScroll) {
    //return 3000;
    distanceToScroll = Math.abs(distanceToScroll);
    var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
    return Math.min(400, Math.max(100, duration));
}