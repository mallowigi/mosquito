var core_1 = require('angular2/core');
/**
 * @private
 */
function ConfigComponent(config) {
    return function (cls) {
        var annotations = Reflect.getMetadata('annotations', cls) || [];
        annotations.push(new core_1.Component(appendConfig(cls, config)));
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}
exports.ConfigComponent = ConfigComponent;
/**
 * @private
 */
function appendConfig(cls, config) {
    config.host = config.host || {};
    cls.defaultInputs = config.defaultInputs || {};
    config.inputs = config.inputs || [];
    for (var prop in cls.defaultInputs) {
        // add the property to the component "inputs"
        config.inputs.push(prop);
        // set the component "hostProperties", so the instance's
        // input value will be used to set the element's attribute
        config.host['[attr.' + prop + ']'] = prop;
    }
    cls.delegates = config.delegates;
    return config;
}