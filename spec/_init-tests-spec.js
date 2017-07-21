/**
 * THIS IS NOT A TEST SUITE !!
 *
 * This module performs some initialization of the DOM.
 *
 */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const storageMock = require('../preferences/StorageMock');

// code to boostrap mount with JSDOM
// see: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
const exposedProperties = ['window', 'navigator', 'document'];
let dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
global.document =  dom.window.document;
global.window = document.defaultView;
global.window.localStorage = storageMock();

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js',
};