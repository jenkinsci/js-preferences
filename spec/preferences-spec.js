/**
 * Created by thorsten on 3/24/17.
 */

const preferencesArray = [{
        key: 'runDetails.logView',
        defaultValue: 'pipeline',
        allowedValues: ['classic', 'pipeline'],
    },
    {
        key: 'runDetails.pipeline.updateOnFinish',
        defaultValue: 'default',
        allowedValues: ['default', 'never'],
    },
    {
        key: 'runDetails.pipeline.showPending',
        defaultValue: 'default',
        allowedValues: ['default', 'never'],
    },
    {
        key: 'runDetails.pipeline.karaoke',
        defaultValue: 'default',
        allowedValues: ['default', 'never'],
    },
];

describe("Preference smoke testing", function () {
    const preference = require('../preferences/Preference');
    it("returns undefined", function () {
        const prop = preference.newPreference('xxx');
        expect(prop.value).toBe(undefined);
    });
    it("returns defaultValue", function () {
        const prop = preference.newPreference('xxx', 'aaa');
        expect(prop.value).toBe('aaa');
    });
    it("returns allowedValues", function () {
        const prop = preference.newPreference('xxx2', 'xxx', ['aaa', 'xxx']);
        expect(prop.value).toBe('xxx');
        expect(prop.getAllowedValues()).toEqual(['aaa', 'xxx']);
    });
});

describe("Preferences smoke testing", function () {
    const preferences = require('../preferences/Preferences');
    const karaokeConfig = preferences.newPreferences(preferencesArray);
    it("returns undefined", function () {
        const prop = karaokeConfig.getPreference('xxx');
        expect(prop).toBe(undefined);
    });
    it("returns defaultValue", function () {
        const prop = karaokeConfig.getPreference('runDetails.logView');
        expect(prop.value).toBe('pipeline');
    });
    it("returns defaultValue and allowedValues", function () {
        const prop = karaokeConfig.getPreference('runDetails.pipeline.showPending');
        expect(prop.value).toBe('default');
        expect(prop.getAllowedValues()).toEqual(['default', 'never']);
    });
});

describe("Preferences should be found in the localStorage direct access", function () {
    const preferences = require('../preferences/Preferences');
    const karaokeConfig = preferences.newPreferences(preferencesArray);
    const localStorage = window.localStorage;
    const PREFIX = 'jenkins-preferences:';
    let key = 'xxx4u';
    it("returns undefined", function () {
        const prop = karaokeConfig.getPreference(key);
        expect(prop).toBe(undefined);
        // validate windows
        expect(prop).toBe(localStorage.getItem(PREFIX + key));
    });
    it("returns defaultValue", function () {
        key = 'runDetails.logView';
        const prop = karaokeConfig.getPreference(key);
        expect(prop.value).toBe('pipeline');
        // validate windows
        expect(prop.value).toBe(window.localStorage.getItem(PREFIX + key));
    });
    it("returns defaultValue and allowedValues", function () {
        key = 'runDetails.pipeline.showPending';
        const prop = karaokeConfig.getPreference(key);
        expect(prop.value).toBe('default');
        // validate windows
        expect(prop.value).toBe(window.localStorage.getItem(PREFIX + key));
        expect(prop.getAllowedValues()).toEqual(['default', 'never']);
    });
    it("test that we can add to different namespace and do not delete old one", function () {
        const preference = require('../preferences/Preference');
        const newNs = 'xxx';
        key = 'runDetails.pipeline.showPending';
        preference.newPreference(key, 'never', undefined, newNs);
        const prop = karaokeConfig.getPreference(key);
        expect(prop.value).toBe('default');
        // validate windows
        expect('never').toBe(window.localStorage.getItem(newNs + ':' + key));
    });
});