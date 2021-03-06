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
 * @private
 */
var OverlayNav = (function () {
    function OverlayNav() {
        // deprecated warning
        console.warn('<ion-overlay> is no longer needed and can be safely removed.');
        console.warn('https://github.com/driftyco/ionic2/blob/master/CHANGELOG.md#overlay-refactor');
        console.warn('See the v2 docs for an update on how overlays work.');
    }
    OverlayNav = __decorate([
        core_1.Directive({
            selector: 'ion-overlay'
        }), 
        __metadata('design:paramtypes', [])
    ], OverlayNav);
    return OverlayNav;
})();
exports.OverlayNav = OverlayNav;