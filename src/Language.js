'use strict';

var utils = require('./utils');

function Language(token, data) {
    this.__token = token;

    Object.defineProperties(this, {
        name: { value: data.name, enumerable: true },
        code: { value: data.code, enumerable: true },
        percentage: { value: data.percentage, enumerable: true }
    });
}

module.exports = Language;
