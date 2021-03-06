var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ion_1 = require('../ion');
var animation_1 = require('../../animations/animation');
var gesture_1 = require('../../gestures/gesture');
var config_1 = require('../../config/config');
var util_1 = require('../../util');
var dom_1 = require('../../util/dom');
var util = require('../../util');
var swiper_widget_1 = require('./swiper-widget');
/**
 * @name Slides
 * @description
 * Slides is a slide box implementation based on Swiper.js
 *
 * Swiper.js:
 * The most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * @usage
 * ```ts
 * @Page({
 *  template: `
 *     <ion-slides pager (change)="onSlideChanged($event)" loop="true" autoplay="true">
 *      <ion-slide>
 *        <h3>Thank you for choosing the Awesome App!</h3>
 *        <p>
 *          The number one app for everything awesome.
 *        </p>
 *      </ion-slide>
 *      <ion-slide>
 *        <h3>Using Awesome</h3>
 *         <div id="list">
 *           <h5>Just three steps:</h5>
 *           <ol>
 *             <li>Be awesome</li>
 *             <li>Stay awesome</li>
 *             <li>There is no step 3</li>
 *           </ol>
 *         </div>
 *      </ion-slide>
 *      <ion-slide>
 *        <h3>Any questions?</h3>
 *      </ion-slide>
 *    </ion-slides>
 *    `
 *})
 *
 *```
 * @property {Boolean} [autoplay] - whether or not the slides should automatically change
 * @property {Boolean} [loop] - whether the slides should loop from the last slide back to the first
 * @property {Boolean} [bounce] - whether the slides should bounce
 * @property {Number} [index] - The slide index to start on
 * @property [pager] - add this property to enable the slide pager
 * @property {Any} [change] - expression to evaluate when a slide has been changed
 * @demo /docs/v2/demos/slides/
 * @see {@link /docs/v2/components#slides Slides Component Docs}
 */
var Slides = (function (_super) {
    __extends(Slides, _super);
    /**
     * @private
     * @param {ElementRef} elementRef  TODO
     */
    function Slides(elementRef, config) {
        var _this = this;
        _super.call(this, elementRef, config);
        this.change = new core_1.EventEmitter();
        this.rapidUpdate = util.debounce(function () {
            _this.update();
        }, 10);
        console.warn("(slideChanged) deprecated. Use (change) to track slide changes.");
    }
    /**
     * @private
     */
    Slides.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.options) {
            this.options = {};
        }
        this.showPager = util.isTrueProperty(this.pager);
        var options = util.defaults({
            loop: this.loop,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            lazyLoading: true,
            preloadImages: false
        }, this.options);
        options.onTap = function (swiper, e) {
            _this.onTap(swiper, e);
            return _this.options.onTap && _this.options.onTap(swiper, e);
        };
        options.onClick = function (swiper, e) {
            _this.onClick(swiper, e);
            return _this.options.onClick && _this.options.onClick(swiper, e);
        };
        options.onDoubleTap = function (swiper, e) {
            _this.onDoubleTap(swiper, e);
            return _this.options.onDoubleTap && _this.options.onDoubleTap(swiper, e);
        };
        options.onTransitionStart = function (swiper, e) {
            _this.onTransitionStart(swiper, e);
            return _this.options.onTransitionStart && _this.options.onTransitionStart(swiper, e);
        };
        options.onTransitionEnd = function (swiper, e) {
            _this.onTransitionEnd(swiper, e);
            return _this.options.onTransitionEnd && _this.options.onTransitionEnd(swiper, e);
        };
        options.onSlideChangeStart = function (swiper) {
            return _this.options.onSlideChangeStart && _this.options.onSlideChangeStart(swiper);
        };
        options.onSlideChangeEnd = function (swiper) {
            _this.change.emit(swiper);
            return _this.options.onSlideChangeEnd && _this.options.onSlideChangeEnd(swiper);
        };
        options.onLazyImageLoad = function (swiper, slide, img) {
            return _this.options.onLazyImageLoad && _this.options.onLazyImageLoad(swiper, slide, img);
        };
        options.onLazyImageReady = function (swiper, slide, img) {
            return _this.options.onLazyImageReady && _this.options.onLazyImageReady(swiper, slide, img);
        };
        var swiper = new swiper_widget_1.Swiper(this.getNativeElement().children[0], options);
        this.slider = swiper;
        /*
        * TODO: Finish this
        if(util.isTrueProperty(this.zoom)) {
          this.enableZoom = true;
          setTimeout(() => {
            this.initZoom();
          })
        }
        */
    };
    /**
     * @private
     */
    Slides.prototype.onTap = function (swiper, e) {
    };
    /**
     * @private
     */
    Slides.prototype.onClick = function (swiper, e) {
    };
    /**
     * @private
     */
    Slides.prototype.onDoubleTap = function (swiper, e) {
        this.toggleZoom(swiper, e);
    };
    /**
     * @private
     */
    Slides.prototype.onLazyImageLoad = function (swiper, slide, img) {
    };
    /**
     * @private
     */
    Slides.prototype.onLazyImageReady = function (swiper, slide, img) {
    };
    /*
    nextButton(swiper, e) {
    }
    prevButton() {
    }
    indexButton() {
    }
    */
    /**
     * @private
     */
    Slides.prototype.initZoom = function () {
        var _this = this;
        this.zoomDuration = this.zoomDuration || 230;
        this.maxScale = this.zoomMax || 3;
        this.zoomElement = this.getNativeElement().children[0].children[0];
        this.zoomElement && this.zoomElement.classList.add('ion-scroll-zoom');
        this.zoomGesture = new gesture_1.Gesture(this.zoomElement);
        this.zoomGesture.listen();
        this.scale = 1;
        this.zoomLastPosX = 0;
        this.zoomLastPosY = 0;
        var last_scale, startX, startY, posX = 0, posY = 0, zoomRect;
        this.viewportWidth = this.getNativeElement().offsetWidth;
        this.viewportHeight = this.getNativeElement().offsetHeight;
        this.zoomElement.addEventListener('touchstart', function (e) {
            _this.onTouchStart(e);
        });
        this.zoomElement.addEventListener('touchmove', function (e) {
            _this.onTouchMove(e);
        });
        this.zoomElement.addEventListener('touchend', function (e) {
            _this.onTouchEnd(e);
        });
        this.zoomGesture.on('pinchstart', function (e) {
            last_scale = _this.scale;
            console.log('Last scale', e.scale);
        });
        this.zoomGesture.on('pinch', function (e) {
            _this.scale = Math.max(1, Math.min(last_scale * e.scale, 10));
            console.log('Scaling', _this.scale);
            _this.zoomElement.style[dom_1.CSS.transform] = 'scale(' + _this.scale + ')';
            zoomRect = _this.zoomElement.getBoundingClientRect();
        });
        this.zoomGesture.on('pinchend', function (e) {
            //last_scale = Math.max(1, Math.min(last_scale * e.scale, 10));
            if (_this.scale > _this.maxScale) {
                var za = new animation_1.Animation(_this.zoomElement)
                    .duration(_this.zoomDuration)
                    .easing('linear')
                    .from('scale', _this.scale)
                    .to('scale', _this.maxScale);
                za.play();
                _this.scale = _this.maxScale;
            }
        });
    };
    /**
     * @private
     */
    Slides.prototype.resetZoom = function () {
        if (this.zoomElement) {
            this.zoomElement.parentElement.style[dom_1.CSS.transform] = '';
            this.zoomElement.style[dom_1.CSS.transform] = 'scale(1)';
        }
        this.scale = 1;
        this.zoomLastPosX = 0;
        this.zoomLastPosY = 0;
    };
    /**
     * @private
     */
    Slides.prototype.toggleZoom = function (swiper, e) {
        console.log('Try toggle zoom');
        if (!this.enableZoom) {
            return;
        }
        console.log('Toggling zoom', e);
        /*
        let x = e.pointers[0].clientX;
        let y = e.pointers[0].clientY;
    
        let mx = this.viewportWidth / 2;
        let my = this.viewportHeight / 2;
    
        let tx, ty;
    
        if(x > mx) {
          // Greater than half
          tx = -x;
        } else {
          // Less than or equal to half
          tx = (this.viewportWidth - x);
        }
        if(y > my) {
          ty = -y;
        } else {
          ty = y-my;
        }
    
        console.log(y);
        */
        var zi = new animation_1.Animation(this.touch.target.children[0])
            .duration(this.zoomDuration)
            .easing('linear')
            .fill('none');
        var zw = new animation_1.Animation(this.touch.target.children[0])
            .duration(this.zoomDuration)
            .easing('linear');
        var za = new animation_1.Animation();
        za.fill('none');
        za.add(zi); //, zw);
        if (this.scale > 1) {
            // Zoom out
            //zw.fromTo('translateX', posX + 'px', '0px');
            //zw.fromTo('translateY', posY + 'px', '0px');
            zi.from('scale', this.scale);
            zi.to('scale', 1);
            za.play();
            //posX = 0;
            //posY = 0;
            this.scale = 1;
        }
        else {
            // Zoom in
            //zw.fromTo('translateX', posX + 'px', tx + 'px');
            //zw.fromTo('translateY', posY + 'px', ty + 'px');
            zi.from('scale', this.scale);
            zi.to('scale', this.maxScale);
            za.play();
            //posX = tx;
            //posY = ty;
            this.scale = this.maxScale;
        }
    };
    /**
     * @private
     */
    Slides.prototype.onTransitionStart = function (swiper) {
    };
    /**
     * @private
     */
    Slides.prototype.onTransitionEnd = function (swiper) {
    };
    /**
     * @private
     */
    Slides.prototype.onTouchStart = function (e) {
        console.log('Touch start', e);
        //TODO: Support mice as well
        var target = util_1.dom.closest(e.target, '.slide').children[0].children[0];
        this.touch = {
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
            deltaX: 0,
            deltaY: 0,
            lastX: 0,
            lastY: 0,
            target: target.parentElement,
            zoomable: target,
            zoomableWidth: target.offsetWidth,
            zoomableHeight: target.offsetHeight
        };
        console.log('Target', this.touch.target);
        //TODO: android prevent default
    };
    /**
     * @private
     */
    Slides.prototype.onTouchMove = function (e) {
        this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
        this.touch.deltaY = e.touches[0].clientY - this.touch.startY;
        // TODO: Make sure we need to transform (image is bigger than viewport)
        var zoomableScaledWidth = this.touch.zoomableWidth * this.scale;
        var zoomableScaledHeight = this.touch.zoomableHeight * this.scale;
        var x1 = Math.min((this.viewportWidth / 2) - zoomableScaledWidth / 2, 0);
        var x2 = -x1;
        var y1 = Math.min((this.viewportHeight / 2) - zoomableScaledHeight / 2, 0);
        var y2 = -y1;
        console.log('BOUNDS', x1, x2, y1, y2);
        if (this.scale <= 1) {
            return;
        }
        console.log('PAN', e);
        // Move image
        this.touch.x = this.touch.deltaX + this.touch.lastX;
        this.touch.y = this.touch.deltaY + this.touch.lastY;
        console.log(this.touch.x, this.touch.y);
        if (this.touch.x < x1) {
            console.log('OUT ON LEFT');
        }
        if (this.touch.x > x2) {
            console.log('OUT ON RIGHT');
        }
        if (this.touch.x > this.viewportWidth) {
        }
        else if (-this.touch.x > this.viewportWidth) {
        }
        else {
            console.log('TRANSFORM', this.touch.x, this.touch.y, this.touch.target);
            //this.touch.target.style[CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
            this.touch.target.style[dom_1.CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };
    /**
     * @private
     */
    Slides.prototype.onTouchEnd = function (e) {
        console.log('PANEND', e);
        if (this.scale > 1) {
            if (Math.abs(this.touch.x) > this.viewportWidth) {
                posX = posX > 0 ? this.viewportWidth - 1 : -(this.viewportWidth - 1);
                console.log('Setting on posx', this.touch.x);
            }
            /*
            if(posY > this.viewportHeight/2) {
              let z = new Animation(this.zoomElement.parentElement);
              z.fromTo('translateY', posY + 'px', Math.min(this.viewportHeight/2 + 30, posY));
              z.play();
            } else {
              let z = new Animation(this.zoomElement.parentElement);
              z.fromTo('translateY', posY + 'px', Math.max(this.viewportHeight/2 - 30, posY));
              z.play();
            }
            */
            this.touch.lastX = this.touch.x;
            this.touch.lastY = this.touch.y;
        }
    };
    /**
     * @private
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    Slides.prototype.update = function () {
        var _this = this;
        setTimeout(function () {
            _this.slider.update();
            // Don't allow pager to show with > 10 slides
            if (_this.slider.slides.length > 10) {
                _this.showPager = false;
            }
        });
    };
    /**
     * @private
     */
    Slides.prototype.next = function () {
        this.slider.slideNext();
    };
    /**
     * @private
     */
    Slides.prototype.prev = function () {
        this.slider.slidePrev();
    };
    /**
     * @private
     */
    Slides.prototype.getIndex = function () {
        return this.slider.activeIndex;
    };
    /**
     * @private
     */
    Slides.prototype.getNumSlides = function () {
        return this.slider.slides.length;
    };
    /**
     * @private
     */
    Slides.prototype.isAtEnd = function () {
        return this.slider.isEnd;
    };
    /**
     * @private
     */
    Slides.prototype.isAtBeginning = function () {
        return this.slider.isBeginning;
    };
    /**
     * @private
     */
    Slides.prototype.getSliderWidget = function () {
        return this.slider;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], Slides.prototype, "change", void 0);
    Slides = __decorate([
        core_1.Component({
            selector: 'ion-slides',
            inputs: [
                'autoplay',
                'loop',
                'index',
                'bounce',
                'pager',
                'options',
                'zoom',
                'zoomDuration',
                'zoomMax'
            ],
            template: '<div class="swiper-container">' +
                '<div class="swiper-wrapper">' +
                '<ng-content></ng-content>' +
                '</div>' +
                '<div [class.hide]="!showPager" class="swiper-pagination"></div>' +
                '</div>',
            directives: [common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object])
    ], Slides);
    return Slides;
    var _a, _b, _c;
})(ion_1.Ion);
exports.Slides = Slides;
/**
 * @private
 */
var Slide = (function () {
    /**
     * TODO
     * @param {Slides} slides  The containing slidebox.
     * @param {ElementRef} elementRef  TODO
     */
    function Slide(elementRef, slides) {
        this.ele = elementRef.nativeElement;
        this.ele.classList.add('swiper-slide');
        slides.rapidUpdate();
    }
    Slide = __decorate([
        core_1.Component({
            selector: 'ion-slide',
            inputs: ['zoom'],
            template: '<div class="slide-zoom"><ng-content></ng-content></div>'
        }),
        __param(1, core_1.Host()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, Slides])
    ], Slide);
    return Slide;
    var _a;
})();
exports.Slide = Slide;
/**
 * @private
 */
var SlideLazy = (function () {
    function SlideLazy(elementRef) {
        elementRef.getNativeElement().classList.add('swiper-lazy');
    }
    SlideLazy = __decorate([
        core_1.Directive({
            selector: 'slide-lazy',
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], SlideLazy);
    return SlideLazy;
    var _a;
})();
exports.SlideLazy = SlideLazy;