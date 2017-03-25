// See https://github.com/jenkinsci/js-storage
const storage = require('@jenkins-cd/storage');
const jenkinsNS = storage.jenkinsNamespace();
const preferences = jenkinsNS.subspace('preferences');
/**
 * This uses the localStorage to store and read from. We use a simple
 * key:value in the localStorage but further expose the allowedValues
 * passed. For now we do not validate those.
 * @param {string} key - the key we want to store
 * @param {string} [defaultValue] - if no value is set in the storage we will set this value
 * @param {Array} [allowedValues] - an array of known values that should be supported
 * @constructor
 * @example
 * preference.newPreference('key', 'defaultValue', ['defaultValue', 'allowedValues']);
 */
function Preference(key, defaultValue, allowedValues) {
    if (key === undefined) {
        throw new Error('Cannot create preference. Preference "key" name must be specified.');
    }
    this.key = key;
    let value = preferences.get(key);
    if (!value && defaultValue) {
        preferences.set(key, defaultValue);
        value = defaultValue;
    }
    this.value = value;
    this.allowedValues = allowedValues;
}

Preference.prototype = {
    /**
     * setter method to set the new value for the preference
     * @param newValue
     */
    set newValue(newValue) {
        preferences.set(this.key, newValue);
        this.value = newValue;
    },
    /**
     * get the value
     * @returns {*|string|Object|boolean|number|undefined}
     */
    getValue() {
        return this.value;
    },
    /**
     * get the known allowed values for this preference
     * @returns {*}
     */
    getAllowedValues() {
        return this.allowedValues;
    }
};
/**
 * Create a {Preference} instance for the specified key.
 * @param {string} key The key name. Use dot separated naming convention to create a key hierarchy (ala Log4J).
 * @param {string} [defaultValue] The default value we want to use if nothing is set
 * @param {Array} [allowedValues] Array of known supported values
 * @returns {Preference} The {Preference} instance.
 */
exports.newPreference = function (key, defaultValue, allowedValues) {
    return new Preference(key, defaultValue, allowedValues);
};
