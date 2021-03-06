import { ChangeDetectorRef, Compiler, ElementRef, NgZone, AppViewManager, Renderer } from 'angular2/core';
import { Ion } from '../ion';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
/**
 * _For examples on the basic usage of NavController, check out the
 * [Navigation section](../../../../components/#navigation) of the Component
 * docs._
 *
 * NavController is the base class for navigation controller components like
 * [`Nav`](../Nav/) and [`Tab`](../../Tabs/Tab/). You use navigation controllers
 * to navigate to [pages](#creating_pages) in your app. At a basic level, a
 * navigation controller is an array of pages representing a particular history
 * (of a Tab for example). This array can be manipulated to navigate throughout
 * an app by pushing and popping pages or inserting and removing them at
 * arbitrary locations in history.
 *
 * The current page is the last one in the array, or the top of the stack if we
 * think of it that way.  [Pushing](#push) a new page onto the top of the
 * navigation stack causes the new page to be animated in, while [popping](#pop)
 * the current page will navigate to the previous page in the stack.
 *
 * Unless you are using a directive like [NavPush](../NavPush/), or need a
 * specific NavController, most times you will inject and use a reference to the
 * nearest NavController to manipulate the navigation stack.
 *
 * <h3 id="injecting_nav_controller">Injecting NavController</h3>
 * Injecting NavController will always get you an instance of the nearest
 * NavController, regardless of whether it is a Tab or a Nav.
 *
 * Behind the scenes, when Ionic instantiates a new NavController, it creates an
 * injector with NavController bound to that instance (usually either a Nav or
 * Tab) and adds the injector to its own providers.  For more information on
 * providers and dependency injection, see [Providers and DI]().
 *
 * Instead, you can inject NavController and know that it is the correct
 * navigation controller for most situations (for more advanced situations, see
 * [Menu](../../Menu/Menu/) and [Tab](../../Tab/Tab/)).
 *
 * ```ts
 *  class MyComponent {
 *    constructor(nav: NavController) {
 *      this.nav = nav;
 *    }
 *  }
 * ```
 *
 * <h2 id="creating_pages">Page creation</h2>
 * _For more information on the `@Page` decorator see the [@Page API
 * reference](../../../decorators/Page/)._
 *
 * Pages are created when they are added to the navigation stack.  For methods
 * like [push()](#push), the NavController takes any component class that is
 * decorated with `@Page` as its first argument.  The NavController then
 * compiles that component, adds it to the app and animates it into view.
 *
 * By default, pages are cached and left in the DOM if they are navigated away
 * from but still in the navigation stack (the exiting page on a `push()` for
 * example).  They are destroyed when removed from the navigation stack (on
 * [pop()](#pop) or [setRoot()](#setRoot)).
 *
 *
 * <h2 id="Lifecycle">Lifecycle events</h2>
 * Lifecycle events are fired during various stages of navigation.  They can be
 * defined in any `@Page` decorated component class.
 *
 * ```ts
 * @Page({
 *   template: 'Hello World'
 * })
 * class HelloWorld {
 *   onPageLoaded() {
 *     console.log("I'm alive!");
 *   }
 *   onPageWillLeave() {
 *     console.log("Looks like I'm about to leave :(");
 *   }
 * }
 * ```
 *
 *
 *
 * - `onPageLoaded` - Runs when the page has loaded. This event only happens once per page being created and added to the DOM. If a page leaves but is cached, then this event will not fire again on a subsequent viewing. The `onPageLoaded` event is good place to put your setup code for the page.
 * - `onPageWillEnter` - Runs when the page is about to enter and become the active page.
 * - `onPageDidEnter` - Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
 * - `onPageWillLeave` - Runs when the page is about to leave and no longer be the active page.
 * - `onPageDidLeave` - Runs when the page has finished leaving and is no longer the active page.
 * - `onPageWillUnload` - Runs when the page is about to be destroyed and have its elements removed.
 * - `onPageDidUnload` - Runs after the page has been destroyed and its elements have been removed.
 *
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 */
export declare class NavController extends Ion {
    constructor(parentnavCtrl: NavController, app: IonicApp, config: Config, keyboard: Keyboard, elementRef: ElementRef, anchorName: string, compiler: Compiler, viewManager: AppViewManager, zone: NgZone, renderer: Renderer, cd: ChangeDetectorRef);
    /**
     * Boolean if the nav controller is actively transitioning or not.
     * @private
     * @return {bool}
     */
    isTransitioning(): boolean;
    /**
     * Boolean if the nav controller is actively transitioning or not.
     * @private
     * @return {bool}
     */
    setTransitioning(isTransitioning: any, fallback?: number): void;
    /**
     * Push is how we can pass components and navigate to them. We push the component we want to navigate to on to the navigation stack.
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav:NavController){
     *      this.nav = nav;
     *    }
     *
     *    pushPage(){
     *      this.nav.push(SecondView);
     *    }
     * }
     * ```
     *
     * We can also pass along parameters to the next view, such as data that we have on the current view. This is a similar concept to to V1 apps with `$stateParams`.
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav:NavController){
     *      this.nav = nav;
     *    }
     *
     *    pushPage(user){
     *      this.nav.push(SecondView,{
     *       // user is an object we have in our view
     *       // typically this comes from an ngFor or some array
     *       // here we can create an object with a property of
     *       // paramUser, and set it's value to the user object we passed in
     *       paramUser: user
     *      });
     *    }
     * }
     * ```
     *
     * We'll look at how we can access that data in the `SecondView` in the navParam docs
     *
     * We can also pass any options to the transtion from that same method
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav: NavController){
     *      this.nav = nav;
     *    }
     *
     *    pushPage(user){
     *      this.nav.push(SecondView,{
     *       // user is an object we have in our view
     *       // typically this comes from an ngFor or some array
     *       // here we can create an object with a property of
     *       // paramUser, and set it's value to the user object we passed in
     *       paramUser: user
     *      },{
     *       // here we can configure things like the animations direction or
     *       // or if the view should animate at all.
     *       direction: 'back'
     *      });
     *    }
     * }
     * ```
     * @param {Any} component The page component class you want to push on to the navigation stack
     * @param {Object} [params={}] Any nav-params you want to pass along to the next view
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise, which resolves when the transition has completed
     */
    push(componentType: any, params: {}, opts: {}, callback: any): any;
    /**
     * Present is how we display overlays on top of the content, from within the
     * root level `NavController`. The `present` method is used by overlays, such
     * as `ActionSheet`, `Alert`, and `Modal`. The main difference between `push`
     * and `present`, is that `present` takes a `ViewController` instance, whereas
     * `push` takes a `Page` component class. Additionally, `present` will place
     * the overlay in the root NavController's stack.
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *
     *    presentModal() {
     *      let modal = Modal.create(ProfilePage);
     *      this.nav.present(modal);
     *    }
     * }
     * ```
     *
     * @param {ViewController} enteringView The name of the component you want to push on the navigation stack
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise, which resolves when the transition has completed
     */
    present(enteringView: any, opts?: {}): Promise<{}>;
    /**
     * If you wanted to navigate back from a current view, you can use the back-button or programatically call `pop()`
     * Similar to `push()`, you can pass animation options.
     *
     * ```typescript
     * class SecondView{
     *    constructor(nav:NavController){
     *      this.nav = nav;
     *    }
     *    goBack(){
     *      this.nav.pop();
     *    }
     * }
     * ```
     *
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when the transition is completed
     */
    pop(opts?: {}): any;
    /**
     * @private
     * Pop to a specific view in the history stack
     * @param view {ViewController} to pop to
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     */
    popTo(viewCtrl: any, opts?: {}): any;
    /**
     * Similar to `pop()`, this method let's you navigate back to the root of the stack, no matter how many views that is
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     */
    popToRoot(opts?: {}): any;
    /**
     * Inserts a view into the nav stack at the specified index.
     * This is useful if you need to add a view at any point in your navigation stack
     *
     * ```typescript
     * export class Detail {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    insertView(){
     *      this.nav.insert(1,Info)
     *    }
     *  }
     * ```
     *
     * This will insert the `Info` view into the second slot of our navigation stack
     *
     * @param {Number} index The index where you want to insert the view
     * @param {Any} component The name of the component you want to insert into the nav stack
     * @returns {Promise} Returns a promise when the view has been inserted into the navigation stack
     */
    insert(index: any, componentType: any, params?: {}, opts?: {}): any;
    /**
     * Removes a view from the nav stack at the specified index.
     *
     * ```typescript
     * export class Detail {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    removeView(){
     *      this.nav.remove(1)
     *    }
     *  }
     * ```
     *
     * @param {Number} index Remove the view from the nav stack at that index
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when the view has been removed
     */
    remove(index: any, opts?: {}): any;
    /**
     * @private
     */
    setViews(components: any, opts?: {}): any;
    /**
     * You can set the views of the current navigation stack and navigate to the last view past
     *
     *
     *```typescript
     * import {Page, NavController} from 'ionic/ionic'
     * import {Detail} from '../detail/detail'
     * import {Info} from '../info/info'
     *
     *  export class Home {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    setPages() {
     *      this.nav.setPages([List,Detail, Info]);
     *    }
     *  }
     *```
     *
     *
     *In this example, we're giving the current nav stack an array of pages. Then the navigation stack will navigate to the last view in the array and remove the orignal view you came from.
     *
     *By default, animations are disabled, but they can be enabled by passing options to the navigation controller
     *
     *
     *```typescript
     * import {Page, NavController} from 'ionic/ionic'
     * import {Detail} from '../detail/detail'
     * import {Info} from '../info/info'
     *
     *  export class Home {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    setPages() {
     *      this.nav.setPages([List,Detail, Info],{
     *        animate: true
     *      });
     *    }
     *  }
     *```
     *
     *
     *You can also pass any navigation params to the individual pages in the array.
     *
     *
     *```typescript
     * import {Page, NavController} from 'ionic/ionic'
     * import {Detail} from '../detail/detail'
     * import {Info} from '../info/info'
     *
     *  export class Home {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    setPages() {
     *      this.nav.setPages([{
     *        componentType: List,
     *        params: {id: 43}
     *      }, {
     *        componentType: Detail,
     *        params: {id: 45}
     *      },{
     *        componentType: Info,
     *        params: {id: 5}
     *      }]);
     *    }
     *  }
     *```
     *
     * @param {Array} component an arry of components to load in the stack
     * @param {Object} [opts={}] Any options you want to use pass
     * @returns {Promise} Returns a promise when the pages are set
     */
    setPages(components: any, opts?: {}): any;
    /**
     * Set the root for the current navigation stack
     * @param {Component} The name of the component you want to push on the navigation stack
     * @param {Object} [params={}] Any nav-params you want to pass along to the next view
     * @param {Object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when done
     */
    setRoot(componentType: any, params?: {}, opts?: {}): any;
    /**
     * @private
     */
    _transition(enteringView: any, leavingView: any, opts: any, done: any): any;
    /**
     * @private
     */
    _render(enteringView: any, leavingView: any, opts: any, done: any): void;
    /**
     * @private
     */
    _postRender(enteringView: any, leavingView: any, opts: any, done: any): void;
    /**
     * @private
     */
    _beforeTrans(enteringView: any, leavingView: any, opts: any, done: any): void;
    /**
     * @private
     */
    _afterTrans(enteringView: any, leavingView: any, opts: any, done: any): void;
    /**
     * @private
     */
    _transComplete(): void;
    /**
     * @private
     */
    loadPage(viewCtrl: any, navbarContainerRef: any, opts: any, done: any): void;
    /**
     * @private
     */
    _setZIndex(enteringView: any, leavingView: any, direction: any): void;
    /**
     * @private
     */
    _cachePage(viewCtrl: any, shouldShow: any): void;
    /**
     * @private
     */
    _cleanup(activeView: any, previousView: any, skipDestroy: any, skipCache: any): void;
    /**
     * @private
     */
    swipeBackStart(): void;
    /**
     * @private
     */
    swipeBackProgress(value: any): void;
    /**
     * @private
     */
    swipeBackEnd(completeSwipeBack: any, rate: any): void;
    /**
     * @private
     */
    _sbComplete(): void;
    /**
     * Check to see if swipe-to-go-back is enabled
     * @param {boolean=} isSwipeBackEnabled Set whether or not swipe-to-go-back is enabled
     * @returns {boolean} Whether swipe-to-go-back is enabled
     */
    isSwipeBackEnabled(val: any): any;
    /**
     * If it's possible to use swipe back or not. If it's not possible
     * to go back, or swipe back is not enable then this will return false.
     * If it is possible to go back, and swipe back is enabled, then this
     * will return true.
     * @returns {boolean} Whether you can swipe to go back
     */
    canSwipeBack(): any;
    /**
     * Returns `true` if there's a valid previous page that we can pop back to.
     * Otherwise returns false.
     * @returns {boolean} Whether there is a page to go back to
     */
    canGoBack(): any;
    /**
     * @private
     */
    navbarViewContainer(nbContainer: any): any;
    /**
     * @private
     * @returns {TODO} TODO
     */
    anchorElementRef(): any;
    /**
     * @private
     */
    _add(viewCtrl: any): void;
    /**
     * @private
     */
    _incId(viewCtrl: any): void;
    /**
     * @private
     */
    _remove(viewOrIndex: any): void;
    /**
     * @private
     */
    _getStagedEntering(): any;
    /**
     * @private
     */
    _getStagedLeaving(): any;
    /**
     * @private
     * @returns {Component} TODO
     */
    getActive(): any;
    /**
     * @param {Index} The index of the page you want to get
     * @returns {Component} Returns the component that matches the index given
     */
    getByIndex(index: any): any;
    /**
     * @private
     * @param {TODO} view  TODO
     * @returns {TODO} TODO
     */
    getPrevious(viewCtrl: any): any;
    /**
     * First page in this nav controller's stack. This would not return a page which is about to be destroyed.
     * @returns {Component} Returns the first component page in the current stack
     */
    first(): any;
    /**
     * Last page in this nav controller's stack. This would not return a page which is about to be destroyed.
     * @returns {Component} Returns the last component page in the current stack
     */
    last(): any;
    /**
     * @private
     * @param {TODO} view  TODO
     * @returns {TODO} TODO
     */
    indexOf(viewCtrl: any): any;
    /**
     * Number of sibling views in the nav controller. This does
     * not include views which are about to be destroyed.
     * @returns {Number} The number of views in stack, including the current view
     */
    length(): number;
    /**
     * @private
     * @param {TODO} view  TODO
     * @returns {boolean}
     */
    isActive(viewCtrl: any): boolean;
    /**
     * Returns the root NavController.
     * @returns {NavController}
     */
    rootNav: this;
    /**
     * @private
     * @param {TODO} router  TODO
     */
    registerRouter(router: any): void;
}
/**
 * @name NavParams
 * @description
 * NavParams are an object that exists on a page and can contain data for that particular view.
 * Similar to how data was pass to a view in V1 with `$stateParams`, NavParams offer a much more flexible
 * option with a simple `get` method.
 *
 * @usage
 * ```ts
 * export class MyClass{
 *  constructor(params: NavParams){
 *    this.params = params;
 *    // userParams is an object we have in our nav-parameters
 *    this.params.get('userParams');
 *  }
 * }
 * ```
 * @demo /docs/v2/demos/nav-params/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavController/ NavController API Docs}
 * @see {@link ../Nav/ Nav API Docs}
 * @see {@link ../NavPush/ NavPush API Docs}
 */
export declare class NavParams {
    /**
     * @private
     * @param {TODO} data  TODO
     */
    constructor(data: any);
    /**
     * Get the value of a nav-parameter for the current view
     *
     * ```ts
     * export class MyClass{
     *  constructor(params: NavParams){
     *    this.params = params;
     *    // userParams is an object we have in our nav-parameters
     *    this.params.get('userParams');
     *  }
     * }
     * ```
     *
     *
     * @param {string} parameter Which param you want to look up
     */
    get(param: any): any;
}
