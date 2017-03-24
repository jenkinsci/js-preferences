// See https://github.com/jenkinsci/js-storage
const storage = require('@jenkins-cd/storage');
const jenkinsNS = storage.jenkinsNamespace();
const preferences = jenkinsNS.subspace('preferences');

function Preference(key, defaultValue) {
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
}

Preference.prototype = {
    set newValue(newValue) {
        preferences.set(this.key, newValue);
        this.value = newValue;
    },
};
/**
 * Create a {Preference} instance for the specified key.
 * @param {string} key The key name. Use dot separated naming convention to create a key hierarchy (ala Log4J).
 * @param {string} defaultValue The default value we want to use if nothing is set
 * @returns {Preference} The {Preference} instance.
 */
exports.newPreference = function (key, defaultValue) {
    return new Preference(key, defaultValue);
};
