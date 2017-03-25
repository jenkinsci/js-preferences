const preference = require('./Preference');
/**
 * Creates a configuration object based on preferences.
 * This means we use localStorage to interact with the components.
 * @param preferencesArray {array} the preferences that we want to sync with the local storage
 * @constructor
 * @example
 * const preferencesArray = [{
 *    key: 'runDetails.logView',
 *    defaultValue: 'pipeline',
 *    allowedValues: ['classic', 'pipeline'],
 * },
 * {
 *    key: 'runDetails.pipeline.updateOnFinish',
 *    defaultValue: 'default',
 *    allowedValues: ['default', 'never'],
 * },
 * {
 *     key: 'runDetails.pipeline.showPending',
 *     defaultValue: 'default',
 *     allowedValues: ['default', 'never'],
 * },
 * {
 *     key: 'runDetails.pipeline.karaoke',
 *     defaultValue: 'default',
 *     allowedValues: ['default', 'never'],
 * },
 * ];
 * const karaokeConfig = preferences.newPreferences(preferencesArray);
 */
function Preferences(preferencesArray) {
    if (!preferencesArray) {
        throw new Error('Cannot create config. Must pass an array of properties!');
    }
    this.store = {};
    // store the keys we know
    this.keys = preferencesArray.map((item) => {
        this.store[item.key] = preference.newPreference(item.key, item.defaultValue, item.allowedValues);
        return item.key;
    });
}
Preferences.prototype = {
    /**
     * Get the preference representation of the key
     * @param key {string} the lookup key
     * @returns {Preference}
     */
    getPreference(key) {
        return this.store[key];
    },
    /**
     * Returns all registered keys
     * @returns {array}
     */
    getKeys() {
        return this.keys;
    },
};
/**
 * Create a Preference and return this config
 * @param preferencesArray the preferences that we want to sync with the local storage
 * @returns {Preferences}
 */
exports.newPreferences = function (preferencesArray) {
    return new Preferences(preferencesArray);
};
