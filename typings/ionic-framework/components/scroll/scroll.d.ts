import { ElementRef } from 'angular2/core';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * @name Scroll
 * @description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places were you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * @usage
 * ```html
 * <ion-scroll scroll-x="true">
 * </ion-scroll>
 *
 * <ion-scroll scroll-y="true">
 * </ion-scroll>
 *
 * <ion-scroll scroll-x="true" scroll-y="true">
 * </ion-scroll>
 * ```
 *@property {boolean} [scroll-x] - whether to enable scrolling along the X axis
 *@property {boolean} [scroll-y] - whether to enable scrolling along the Y axis
 *@property {boolean} [zoom] - whether to enable zooming
 *@property {number} [max-zoom] - set the max zoom amount for ion-scroll
 * @demo /docs/v2/demos/scroll/
 */
export declare class Scroll extends Ion {
    constructor(elementRef: ElementRef, Config: Config);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * Add a scroll event handler to the scroll element if it exists.
     * @param {Function} handler  The scroll handler to add to the scroll element.
     * @returns {?Function} a function to remove the specified handler, otherwise
     * undefined if the scroll element doesn't exist.
     */
    addScrollEventListener(handler: any): () => void;
}
