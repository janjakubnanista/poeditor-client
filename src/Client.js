'use strict';

var Projects = require('./Projects');
var AvailableLanguages = require('./AvailableLanguages');

function Client(token) {
    Object.defineProperties(this, {
        projects: { value: new Projects(token) },
        languages: { value: new AvailableLanguages(token) }
    });
}

module.exports = Client;
