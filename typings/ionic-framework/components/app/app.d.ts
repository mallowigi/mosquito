import { NgZone } from 'angular2/core';
import { Config } from '../../config/config';
import { ClickBlock } from '../../util/click-block';
/**
 * @private
 * Component registry service.  For more information on registering
 * components see the [IdRef API reference](../id/IdRef/).
 */
export declare class IonicApp {
    private _config;
    private _clickBlock;
    private _zone;
    constructor(_config: Config, _clickBlock: ClickBlock, _zone: NgZone);
    /**
     * Sets the document title.
     * @param {string} val  Value to set the document title to.
     */
    setTitle(val: any): void;
    /**
     * @private
     * Sets if the app is currently enabled or not, meaning if it's
     * available to accept new user commands. For example, this is set to `false`
     * while views transition, a modal slides up, an action-sheet
     * slides up, etc. After the transition completes it is set back to `true`.
     * @param {bool} isEnabled
     * @param {bool} fallback  When `isEnabled` is set to `false`, this argument
     * is used to set the maximum number of milliseconds that app will wait until
     * it will automatically enable the app again. It's basically a fallback incase
     * something goes wrong during a transition and the app wasn't re-enabled correctly.
     */
    setEnabled(isEnabled: any, duration?: number): void;
    /**
     * @private
     * Boolean if the app is actively enabled or not.
     * @return {bool}
     */
    isEnabled(): boolean;
    /**
     * @private
     */
    setScrolling(): void;
    /**
     * @private
     * Boolean if the app is actively scrolling or not.
     * @return {bool}
     */
    isScrolling(): boolean;
    /**
     * @private
     * Register a known component with a key, for easy lookups later.
     * @param {TODO} id  The id to use to register the component
     * @param {TODO} component  The component to register
     */
    register(id: any, component: any): void;
    /**
     * @private
     * Unregister a known component with a key.
     * @param {TODO} id  The id to use to unregister
     */
    unregister(id: any): void;
    /**
     * @private
     * Get a registered component with the given type (returns the first)
     * @param {Object} cls the type to search for
     * @return the matching component, or undefined if none was found
     */
    getRegisteredComponent(cls: any): any;
    /**
     * @private
     * Get the component for the given key.
     * @param {TODO} key  TODO
     * @return {TODO} TODO
     */
    getComponent(id: any): any;
}
