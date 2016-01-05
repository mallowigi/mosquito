import {App, Platform} from 'ionic-framework/ionic';
import {HomePage} from './pages/homepage/homepage';
import {MyDocumentsPage} from './pages/mydocs/myDocumentsPage';
import {SettingsPage} from './pages/settings/settingsPage';

const appView = require('./app.html');
const appStyles = require('./app.scss');

@App({
    template: appView,
    styles: [appStyles]
})
export class MyApp {
    public tab1Root;
    public tab2Root;
    public tab3Root;

    constructor(platform:Platform) {

        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tab2Root = MyDocumentsPage;
        this.tab3Root = SettingsPage;

        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}
