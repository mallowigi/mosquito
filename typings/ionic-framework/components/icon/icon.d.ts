import { ElementRef, Renderer } from 'angular2/core';
import { Config } from '../../config/config';
/**
 * @name Icon
 * @description
 * Icons can be used on their own, or inside of a number of Ionic components.
 * For a full list of available icons, check out the
 * [Ionicons resource docs](../../../../resources/ionicons).
 *
 * One feature of Ionicons is that when icon names are set, the actual icon
 * which is rendered can change slightly depending on the mode the app is
 * running from. For example, by setting the icon name of `alarm`, on iOS the
 * icon will automatically apply `ios-alarm`, and on Material Design it will
 * automatically apply `md-alarm`. This allow the developer to write the
 * markup once, and let Ionic automatically apply the appropriate icon.
 *
 * @usage
 * ```html
 * <!-- automatically uses the correct "star" icon depending on the mode -->
 * <ion-icon name="star"></ion-icon>
 *
 * <!-- explicity set the icon for each mode -->
 * <ion-icon ios="ios-home" md="md-home"></ion-icon>
 *
 * <!-- always use the same icon, no matter what the mode -->
 * <ion-icon name="ios-clock"></ion-icon>
 * <ion-icon name="logo-twitter"></ion-icon>
 * ```
 *
 * @property {string} [name] - Use the appropriate icon for the mode.
 * @property {string} [ios] - Explicitly set the icon to use on iOS.
 * @property {string} [md] - Explicitly set the icon to use on Android.
 * @property {boolean} [isActive] - Whether or not the icon has an "active"
 * appearance. On iOS an active icon is filled in or full appearance, and an
 * inactive icon on iOS will use an outlined version of the icon same icon.
 * Material Design icons do not change appearance depending if they're active
 * or not. The `isActive` property is largely used by the tabbar.
 * @see {@link /docs/v2/components#icons Icon Component Docs}
 *
 */
export declare class Icon {
    private _elementRef;
    private _renderer;
    constructor(config: Config, _elementRef: ElementRef, _renderer: Renderer);
    /**
     * @private
     */
    name: any;
    /**
     * @private
     */
    ios: any;
    /**
     * @private
     */
    md: any;
    /**
     * @private
     */
    isActive: boolean;
    /**
     * @private
     */
    update(): void;
    /**
     * @private
     */
    addClass(className: any): void;
}
