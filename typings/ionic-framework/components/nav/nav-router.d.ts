import { ElementRef, DynamicComponentLoader } from 'angular2/core';
import { RouterOutlet, Router, ComponentInstruction } from 'angular2/router';
import { Nav } from './nav';
/**
 * @private
 */
export declare class NavRouter extends RouterOutlet {
    /**
     * TODO
     * @param {ElementRef} _elementRef  TODO
     * @param {DynamicComponentLoader} _loader  TODO
     * @param {Router} _parentRouter  TODO
     * @param {string} nameAttr  Value of the element's 'name' attribute
     * @param {Nav} nav  TODO
     */
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, nameAttr: string, nav: Nav);
    /**
     * @private
     * TODO
     * @param {ComponentInstruction} instruction  TODO
     */
    activate(nextInstruction: ComponentInstruction): Promise<any>;
    reuse(nextInstruction: ComponentInstruction): Promise<void>;
    /**
     * TODO
     * @param {TODO} type  TODO
     * @param {TODO} viewCtrl  TODO
     */
    stateChange(type: any, viewCtrl: any): void;
    /**
     * TODO
     * @param {TODO} componentType  TODO
     * @returns {TODO} TODO
     */
    getPathRecognizerByComponent(componentType: any): any;
}
