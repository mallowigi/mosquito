/**
  Animation Steps/Process
  -----------------------

 - Construct animation (doesn't start)
 - Client play()'s animation, returns promise
 - Add before classes to elements
 - Remove before classes from elements
 - Elements staged in "from" effect w/ inline styles
 - Call onReady()
 - Wait for RENDER_DELAY milliseconds (give browser time to render)
 - Call onPlay()
 - Run from/to animation on elements
 - Animations finish async
 - Set inline styles w/ the "to" effects on elements
 - Add after classes to elements
 - Remove after classes from elements
 - Call onFinish()
 - Resolve play()'s promise
**/
/**
 * @private
**/
export declare class Animation {
    private _parent;
    private _isStaged;
    private _isFinished;
    private _duration;
    private _easing;
    private _from;
    private _to;
    private _rate;
    private _opts;
    private _el;
    private _chld;
    private _ani;
    private _bfSty;
    private _bfAdd;
    private _bfRmv;
    private _afAdd;
    private _afRmv;
    private _readys;
    private _plays;
    private _finishes;
    isProgress: boolean;
    constructor(ele: any, opts?: {});
    reset(): void;
    elements(ele: any): this;
    addElement(ele: any): void;
    parent(parentAnimation: any): this;
    add(childAnimations: any): this;
    duration(value: any): any;
    clearDuration(): void;
    easing(name: any, opts: any): any;
    playbackRate(value: any): any;
    reverse(): any;
    forward(): any;
    from(property: any, value: any): this;
    to(property: any, value: any): this;
    fromTo(property: any, from: any, to: any): this;
    fadeIn(): this;
    fadeOut(): this;
    before: {
        addClass: (className: any) => this;
        removeClass: (className: any) => this;
        setStyles: (styles: any) => this;
    };
    after: {
        addClass: (className: any) => this;
        removeClass: (className: any) => this;
    };
    play(done: any): any;
    stage(): void;
    _onPlay(): void;
    _onFinish(): void;
    pause(): void;
    progressStart(): void;
    progress(value: any): void;
    /**
     * Get the current time of the first animation
     * in the list. To get a specific time of an animation, call
     * subAnimationInstance.getCurrentTime()
     */
    getCurrentTime(): any;
    progressEnd(shouldComplete: any, rate?: number): Promise<any[]>;
    onReady(fn: any, clear: any): this;
    onPlay(fn: any, clear: any): this;
    onFinish(fn: any, clear: any): this;
    clone(): any;
    dispose(removeElement: any): void;
    static create(element: any, name: any): any;
    static createTransition(enteringView: any, leavingView: any, opts?: {}): any;
    static register(name: any, AnimationClass: any): void;
}
