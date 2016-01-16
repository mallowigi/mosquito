import { ElementRef, Renderer, EventEmitter } from 'angular2/core';
/**
 * @private
 */
export declare class TextInput {
    private _elementRef;
    private _renderer;
    value: string;
    ngModel: any;
    valueChange: EventEmitter<string>;
    focusChange: EventEmitter<boolean>;
    constructor(type: string, _elementRef: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    _keyup(ev: any): void;
    _focus(): void;
    _blur(): void;
    labelledBy(val: any): void;
    setFocus(): void;
    relocate(shouldRelocate: any, inputRelativeY: any): void;
    hideFocus(shouldHideFocus: any): void;
    hasFocus(): boolean;
    addClass(className: any): void;
    hasClass(className: any): void;
    element(): any;
}
