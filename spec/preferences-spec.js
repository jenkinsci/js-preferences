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
