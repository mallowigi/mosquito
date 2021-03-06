var dom_1 = require('../util/dom');
var ScrollTo = (function () {
    function ScrollTo(ele, x, y, duration) {
        if (typeof ele === 'string') {
            // string query selector
            ele = document.querySelector(ele);
        }
        if (ele) {
            if (ele.nativeElement) {
                // angular ElementRef
                ele = ele.nativeElement;
            }
            if (ele.nodeType === 1) {
                this._el = ele;
            }
        }
    }
    ScrollTo.prototype.start = function (x, y, duration, tolerance) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        var self = this;
        if (!self._el) {
            // invalid element
            return Promise.resolve();
        }
        x = x || 0;
        y = y || 0;
        tolerance = tolerance || 0;
        var fromY = self._el.scrollTop;
        var fromX = self._el.scrollLeft;
        var xDistance = Math.abs(x - fromX);
        var yDistance = Math.abs(y - fromY);
        if (yDistance <= tolerance && xDistance <= tolerance) {
            // prevent scrolling if already close to there
            self._el = null;
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            var start;
            // start scroll loop
            self.isPlaying = true;
            // chill out for a frame first
            dom_1.raf(function () {
                start = Date.now();
                dom_1.raf(step);
            });
            // scroll loop
            function step() {
                if (!self._el) {
                    return resolve();
                }
                var time = Math.min(1, ((Date.now() - start) / duration));
                // where .5 would be 50% of time on a linear scale easedT gives a
                // fraction based on the easing method
                var easedT = easeOutCubic(time);
                if (fromY != y) {
                    self._el.scrollTop = Math.round((easedT * (y - fromY)) + fromY);
                }
                if (fromX != x) {
                    self._el.scrollLeft = Math.round((easedT * (x - fromX)) + fromX);
                }
                if (time < 1 && self.isPlaying) {
                    dom_1.raf(step);
                }
                else if (!self.isPlaying) {
                    // stopped
                    self._el = null;
                    reject();
                }
                else {
                    // done
                    self._el = null;
                    resolve();
                }
            }
        });
    };
    ScrollTo.prototype.stop = function () {
        this.isPlaying = false;
    };
    ScrollTo.prototype.dispose = function () {
        this.stop();
        this._el = null;
    };
    return ScrollTo;
})();
exports.ScrollTo = ScrollTo;
// decelerating to zero velocity
function easeOutCubic(t) {
    return (--t) * t * t + 1;
}