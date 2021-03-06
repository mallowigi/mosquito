var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var animation_1 = require('./animation');
var TRANSLATEY = 'translateY';
var OFF_BOTTOM = '40px';
var CENTER = '0px';
var SHOW_BACK_BTN_CSS = 'show-back-button';
var MDTransition = (function (_super) {
    __extends(MDTransition, _super);
    function MDTransition(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        // what direction is the transition going
        var backDirection = (opts.direction === 'back');
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        // entering content item moves in bottom to center
        var enteringPage = new animation_1.Animation(enteringView.pageRef());
        enteringPage.before.addClass('show-page');
        this.add(enteringPage);
        if (backDirection) {
            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            enteringPage.fromTo(TRANSLATEY, CENTER, CENTER);
        }
        else {
            this.duration(280).easing('cubic-bezier(0.36,0.66,0.04,1)');
            enteringPage
                .fromTo(TRANSLATEY, OFF_BOTTOM, CENTER)
                .fadeIn();
        }
        if (enteringHasNavbar) {
            var enteringNavBar = new animation_1.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            this.add(enteringNavBar);
            var enteringBackButton = new animation_1.Animation(enteringView.backBtnRef());
            this.add(enteringBackButton);
            if (enteringView.enableBack()) {
                enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
            }
            else {
                enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
            }
        }
        // setup leaving view
        if (leavingView && backDirection) {
            // leaving content
            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            var leavingPage = new animation_1.Animation(leavingView.pageRef());
            this.add(leavingPage.fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fadeOut());
        }
    }
    return MDTransition;
})(animation_1.Animation);
animation_1.Animation.register('md-transition', MDTransition);